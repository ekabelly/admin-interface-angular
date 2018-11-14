import { Component, OnInit } from '@angular/core';
import { Event } from '../../../models/event';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { NameNumPair } from 'src/app/models/namenumpair';

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
    eventTitle: ['', [Validators.required, Validators.maxLength(50)]],
    eventDesc: ['', Validators.maxLength(80)],
    personalType: ['volunteers', Validators.required],
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
      van: false,
      bikes: false,
      truck: false,
      motorcycle: false
    }),
    tags: this.fb.array([])
  })

  //radio
  durations: string[] = ['oneTime', 'continious'];
  displayDuration = {
    oneTime: 'חד פעמית',
    continious: 'מתמשכת' 
  };

  //checkboxes
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

  vehicles: { name: string, translation: string}[] = [
    { name:'private', translation:'רכב פרטי'} ,
    { name:'van', translation:'רכב מסחרי' },
    { name: 'bikes', translation: 'אופניים' },
    { name: 'truck', translation: 'משאית' },
    { name: 'motorcycle', translation: 'אופנוע'}
  ]

  //radio
  personalTypes: string[] = ['open', 'volunteers'];
  personalTypesDisplay = {
    open:'קהל רחב',
    volunteers: 'מתנדבים רשומים'
  };

  volunteersTypes = [
    {name:'activePlus', translation:'פעילים+'}, 
    {name:'active', translation:'פעילים'},
    {name:'supports', translation:'תומכים'}
  ];

  tags: any[];

  constructor(private dataService: DataService, private route:ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.route.parent.params.subscribe((params:Params) =>
      this.handleForm(params['id']))
    console.log(this.form);
  }

  handleForm(id){
    this.fetchTags();
      if(Number(id) > 0 ){
        this.dataService.fetchComment(id).subscribe((data) =>
          setTimeout(()=>this.setForm(data), 0));
      }
      else{
        // const emptyForm = {
        //   volunteersTypes:{},
        //   volunteersNum:{},
        //   time:{}
        // };
        this.isNew = true;
        // setTimeout(()=>this.setForm(emptyForm), 0);
      }
  }

  setForm(data){
    // console.log(data, 'data')
    const isDate = data.time.date;
    this.form.patchValue({
      'volunteersTypes':  {
        'active': data.volunteersTypes.active || false,
        'supports': data.volunteersTypes.supports|| false,
        'activePlus': data.volunteersTypes.activePlus || false
      },
      'volunteersNum':  {
        'min': data.volunteersNum.min || 0,
        'max': data.volunteersNum.max || 4
      },
      eventTitle: data.eventTitle || '',
      eventDesc: data.eventDesc || '',
      personalType: data.personalType || 'volunteers',
      time: {
        date: isDate ? data.time.date.toISOString().slice(0, 10) : null,
        time: isDate ? data.time.date.toISOString().slice(11, 16) : null,
        duration: data.time.duration || 'oneTime'
      },
      urgent: data.urgent || false,
      locationTypes: data.locationTypes || 'single',
      locations: data.locations || [{}]
    })
    data.tags.forEach(tag=>this.markTag(tag));
    // this.form.patchValue({time:{dates:[new Date().toISOString().slice(0, 10)]}});
  }

  markTag(tagNum){
    for(let i = 0; i < this.tags.length; i++){
      if(this.tags[i].value == tagNum){
        this.tags[i].selected = true;
        break;
      }
    }
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

  createLocation(){
    return {
      city:['', Validators.required],
      street:['', Validators.required],
      streetNum:''
    }
  }

  fetchTags(){
    this.dataService.fetchTags().then((data)=> {
      this.tags = data.map(x=>{
        x.selected = false;
        return x;
      });
    })
  }

  createTag(){
    return {
      name:'',
      value:null
    }
  }

  resetForm(){
    if(this.isNew){
      this.form.reset();
    } 
  }

  modifyVehicle(item){
    this.form.get('vehicles').patchValue({[item]: !this.form.get('vehicles').value[item]});
  }

  modifyTag(index){
    this.tags[index].selected = !this.tags[index].selected;
  }

  addTag(tag: string){
    this.dataService.addTag(tag).then(data=>
      this.tags = data.map((item, i)=>{
        if(this.tags[i]){
          item.selected = this.tags[i].selected;
        }else{
          item.selected = true;
        }
        return item;
      }))
  }

  onSave(){
    this.form.get('tags').patchValue([]);
    this.tags.forEach(x=>{if(x.selected) this.form.get('tags').value.push(x.value)});
    console.log(this.form);
  }
}
