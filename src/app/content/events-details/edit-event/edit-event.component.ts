import { Component, OnInit } from '@angular/core';
import { Event } from '../../../models/event';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  event: Event;
  isNew:boolean = false; // default is edit mode
  form: FormGroup = this.fb.group({
    'volunteersTypes': this.fb.group({
      'active': false,
      'supports': false,
      'activePlus': false
    }),
    'volunteersNum':this.fb.group({
      'min': [1, [Validators.required, Validators.min(1)]],
      'max': [4, Validators.min(1)]
    }),
    title: ['', [Validators.required, Validators.maxLength(50)]],
    desc: ['', Validators.maxLength(80)],
    type: [1, Validators.required],
    time: this.fb.group({
      date: [null, Validators.required],
      time: null,
      duration: ['oneTime', Validators.required]
    }),
    urgent: false,
    locationTypes: 'single',
    locations: this.fb.array([this.fb.group(this.createLocation())]),
    contact: this.fb.group({
      phone:'',
      mobile: ['', Validators.required]
    }),
    vehicles: this.fb.group({
      private: false,
      commercial: false,
      bikes: false,
      truck: false,
      motorcycle: false
    }),
    tags: this.fb.array([])
  })

  locationTypes: string[] = [
    'single',
    'dou',
    'multiple'
  ];
  locationTypesDisplay = {
    single: 'מיקום יחיד',
    dou: 'מוצא ויעד',
    multiple: 'מספר מיקומים'
  };
  locations: FormArray;

  //config:
  config = {
    volunteersTypes:[],
    eventTypes:[],
    tags: [],
    vehicles: [],
    duration: []
  };

  volunteersTypes: any[] = [];
  tags: any[];
  vehiclesArr: any[];
  vehicles;

  constructor(private dataService: DataService, private route:ActivatedRoute, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.route.parent.params.subscribe((params:Params) =>
      this.fetchConfig(params['id']))
  }

  createLocation(){
    return {
      city:['', Validators.required],
      street:['', Validators.required],
      houseNum:''
    }
  }

  fetchConfig(id){
    this.dataService.fetchConfig().subscribe((config: any)=> {
      this.config = config;
      this.setVehicles(config.vehicles);
      this.setTags(config.tags);
      this.setVolunteersTypes(config.volunteersTypes)
      this.handleForm(id);
    })
  }

  setVolunteersTypes(volunteersTypes){
    this.volunteersTypes = Object.values(volunteersTypes);
  }

  setVehicles(vehicles){
    this.vehicles = vehicles;
    this.vehiclesArr = Object.keys(vehicles).map((vehicleNum) => ({
        name: vehicles[vehicleNum].name,
        translation: vehicles[vehicleNum].translation,
        value: vehicleNum
    }));
  }

  setTags(tags){
    this.tags = Object.keys(tags).map(tagKey=>({
      selected: false,
      name: tags[tagKey].translation,
      value: tagKey
    }));
  }

  handleForm(id){
    console.log(this.form, 'form');
    if(id != 0 ){
      this.dataService.fetchEvent(id).subscribe(
        (event: Event) =>{
            console.log(event);
           setTimeout(()=>this.setForm(event), 0)})
    }
    else{
      this.isNew = true;
      this.resetForm();
    }
  }
  
  setForm(data: Event){
    // console.log(data, 'event');
    const isDate = data.time.date;
    this.form.patchValue({
      type: this.config.eventTypes[data.type],
      'volunteersNum':  {
        'min': data.volunteers.min || 0,
        'max': data.volunteers.max || 4
      },
      contact: data.contact,
      title: data.title || '',
      desc: data.desc || '',
      time: {
        date: isDate ? data.time.date : null,
        time: isDate ? data.time.date : null,
        duration: this.config.duration[data.time.duration].name || 'oneTime'
      },
      urgent: data.urgent || false,
      locationTypes: data.locations.length > 2 ? 'multiple' : data.locations.length < 2 ? 'single' : 'dou' || 'single',
      locations: data.locations || [{}]
    });
    data.tags.forEach((tag)=>
      this.markTag(tag));
    data.volunteersTypes.forEach((x: number)=>
      this.form.get('volunteersTypes').get(this.config.volunteersTypes[x].name).patchValue(true));

    data.vehicles.forEach((vehicleNum)=>{
      let x = this.config.vehicles[vehicleNum].name;
      this.form.get('vehicles').get(x).patchValue(true);
    })
    // this.form.patchValue({time:{dates:[new Date().toISOString().slice(0, 10)]}});
  }

  changeLocationNum(locationType){
    if(locationType === 'single'){
      this.locations = <FormArray>this.form.get('locations');
      this.locations.controls.splice(1);
    }
    if(locationType === 'dou'){
      this.addLocation(1);
    }
    if(locationType === 'multiple'){
      this.addLocation(2);
    }
  }

  addLocation(length: number | null){
    this.locations = <FormArray>this.form.get('locations');
    while(this.locations.controls.length <= length){
      this.locations.push(this.fb.group(this.createLocation()));
    }
    if(length === null){ 
      this.locations.push(this.fb.group(this.createLocation()));
    }
    else this.locations.controls.splice(length + 1);

  }

  modifyVehicle(item){
    this.form.get('vehicles').patchValue({[item]: !this.form.get('vehicles').value[item]});
  }

  modifyTag(index){
    this.tags[index].selected = !this.tags[index].selected;
  }

  markTag(tagNum){
    for(let i = 0; i < this.tags.length; i++){
      if(this.tags[i].value == tagNum){
        this.tags[i].selected = true;
        this.form.get('tags').value.push(tagNum);
        break;
      }
    }
  }

  addTag(tag: string){
    this.dataService.addTag(tag).then(data=>{
      this.tags = Object.keys(data).map((itemName, i)=>{
        if(this.tags[i]){
          data[itemName].selected = this.tags[i].selected;
        }else{
          data[itemName].selected = true;
        }
        data[itemName].value = itemName;
        data[itemName].name = data[itemName].translation;
        return data[itemName];
      })
    });
  }

  resetForm(){
    if(this.isNew){ //reset form is only viable when  its a new item
      this.form.reset();
      this.form.patchValue({
        type: this.config.eventTypes[1],
        volunteersTypes:{
          active: true
        },
        time:{
          duration:'oneTime'
        },
        locationTypes:'single'
      });
    }
  }

  createArr(item){
    const items = this.form.value[item];
    let x = Object.keys(items).filter(itemName=>items[itemName]);
    x = x.map(itemName=>Object.keys(this.config[item]).find((key)=>this.config[item][key].name === itemName));
    return x;
  }

  insertTagsToForm(){
    this.form.get('tags').patchValue([]);
    this.tags.forEach(x=>{if(x.selected) this.form.get('tags').value.push(x.value)});
  }

  transformVolunteerTypes(){
    const { volunteersTypes } = this.form.value
    return Object.keys(volunteersTypes).filter(key=>volunteersTypes[key]).map(type=>{
      if(type === 'activePlus') return 13;
      if(type === 'active') return 11;
      if(type === 'supports') return 12;
    });
  }

  onSave(){
    this.insertTagsToForm();
    const { title, type, desc, locations, contact, urgent, tags, time, volunteersNum } = this.form.value;
    const event = {
      title,
      desc,
      picUrl: "",
      contact,
      urgent,
      locations,
      vehicles: this.createArr('vehicles'),
      tags,
      volunteersTypes: this.transformVolunteerTypes(),
      type: type.name === 'open' ? 0 : 1,
      time: {
        date: [time.date],
        time: time.time,
        duration: time.duration === 'oneTime' ? 0 : 1
      },
      volunteers: volunteersNum
    }
    console.log(event, 'save');
    this.dataService.pushEvent(event).subscribe(res=>{
      console.log(res);
      // this.router.navigate(['/events']);
    });
  }
}
