import { Component, inject } from '@angular/core';
import { EventService } from '../../services/event.service';
import { DatePipe, KeyValue } from '@angular/common';
import { EventDetailModel } from '../../models/event.interface';
import { PersonPipe } from '../../pipes/person.pipe';
import { EventPipe } from '../../pipes/event.pipe';
import { EditService } from '../../services/Edit.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [DatePipe,PersonPipe,EventPipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})

export class HomePageComponent {
  private eventService = inject(EventService)
  private editService = inject(EditService)
  private router=inject(Router)

  events:EventDetailModel[] = [{} as EventDetailModel];
  viewEventDetail:EventDetailModel|undefined;
  viewDay:KeyValue<Date,EventDetailModel[]|undefined>|undefined;

  calendar:KeyValue<Date,EventDetailModel[]|undefined>[][] = [];

  currentMonth=this.editService.calendarMonth
  currentYear=this.editService.calendarYear
  
  today=new Date(this.currentYear, this.currentMonth,new Date().getDate(),1);


  ngOnInit(){
    this.today.setHours(1)
    this.generateCalendar()
    
    var todayPair
    this.calendar.forEach(x =>
      {
        var d = x.find(y => y.key.getTime() == this.today.getTime())
        if(d!=undefined) todayPair = d
      });
    this.putDayToView(todayPair!);
  }

  generateCalendar(){
    this.calendar=this.getCalendarGrid(this.editService.calendarYear,this.editService.calendarMonth)
    this.eventService.events$.subscribe(
      x => 
      {
        this.events = x.filter(y => this.calendar.some(z => z.some(a => a.key.getTime() == this.stringToDate(y.start).getTime()|| a.key.getTime() == this.stringToDate(y.end).getTime())))
        .sort((a) => this.stringToDate(a.start).getTime());
        this.addEventsToDays()
      }
    )
  }

  addEventsToDays(){
    this.calendar.map(
      x => {
        x.map( 
          y => {
            y.value=this.eventOnDate(y.key)
          }
        )
      }
    )
  }

  getCalendarGrid(year: number, month: number): KeyValue<Date,EventDetailModel[]|undefined>[][] {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    let startWeekday = firstDayOfMonth.getDay(); // 0 (Sunday) - 6 (Saturday)

    // Adjust so Monday = 0, ..., Sunday = 6
    startWeekday = (startWeekday === 0) ? 6 : startWeekday - 1;

    const daysInMonth = lastDayOfMonth.getDate();
    const weeks: KeyValue<Date,EventDetailModel[]|undefined>[][] = [];
    let currentWeek: KeyValue<Date,EventDetailModel[]|undefined>[] = [];

    // Fill days before the first of the month with placeholders from the previous month
    for (let i = startWeekday; i > 0; i--) {
      currentWeek.push({key:new Date(year, month, 1 - i,1),value:undefined});
    }

    // Fill in the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push({key:new Date(year, month, day,1),value:undefined});

      // When the week is full, push it and start a new week
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    let missingDays = currentWeek.length;

    // Fill remaining days with placeholders from next month
    for (let i = currentWeek.length; i < 7; i++) {
      currentWeek.push({key:new Date(year, month + 1, 1+i-missingDays,1),value:undefined});
    }

    weeks.push(currentWeek); // Push the last week
    return weeks;
  }

  nextMonth(){
    if(this.editService.calendarMonth != 11) this.editService.calendarMonth++
    else{
      this.editService.calendarYear++
      this.editService.calendarMonth = 0
    }
    this.currentMonth=this.editService.calendarMonth
    this.currentYear=this.editService.calendarYear
    this.generateCalendar()
  }

  previusMonth(){
    if(this.editService.calendarMonth != 0) this.editService.calendarMonth--
    else{
      this.editService.calendarYear--
      this.editService.calendarMonth = 11
    }
    this.currentMonth=this.editService.calendarMonth
    this.currentYear=this.editService.calendarYear
    this.generateCalendar()
  }

  stringToDate(dt:string) {
    const date = new Date(dt)
    return new Date(date.getFullYear(),date.getMonth(),date.getDate(),1);
  }
  
  eventOnDate(date: Date): (EventDetailModel)[] {
    const events = this.events
      .filter(event => {
          return this.stringToDate(event.start).getTime() <= date.getTime() &&
          date.getTime() <= this.stringToDate(event.end).getTime()
        }
      )
      .sort((a, b) => this.stringToDate(a.start).getTime() - this.stringToDate(b.start).getTime()); // Sort by start time
    
    const rowsFull=[1];
    events.forEach(x=>{
      if(x.rowInGrid) rowsFull.push(x.rowInGrid)
    })  
  
    const mapedEvents = [...events].map(x=>{
        if(x.rowInGrid == undefined) {
          const firstEmpty = [1,2,3,4].filter(x=>!rowsFull.includes(x))[0];
          if(firstEmpty==undefined){
            this.events.find(y=>y.id==x.id)!.rowInGrid = null
            console.log("delll")
          }
          else{
            this.events.find(y=>y.id==x.id)!.rowInGrid = firstEmpty
            rowsFull.push(firstEmpty)
          }
        }
        return x
    });
    return mapedEvents.sort(x=>x.rowInGrid!);
  }

  filterEvents(events:(EventDetailModel)[]){
    return events.filter(x=>x.rowInGrid != null)
  }

  putDayToView(day:KeyValue<Date,EventDetailModel[]|undefined>){
    this.viewEventDetail = undefined;
    this.viewDay = day
  }

  putEventToView(eventId:string){
    this.viewDay = undefined;
    this.viewEventDetail = this.events.find(x=>x.id==eventId)!;
  }

  openEventCreate(){
    this.editService.openEventCreateModal(this.router.url);
    this.router.navigate(['/events'])
  }
  
  openEventEdit(id:string){
    this.editService.openEventEditModal(id,this.router.url);
    this.router.navigate(['/events'])
  }

  stringToColor(input: string): string {
  let hash = 0;
  
  // Generate a hash code from the string
  for (let i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert hash to a valid HSL color
  const hue = Math.abs(hash) % 360; // 0-360 (hue)
  return `hsl(${hue}, 60%, 70%)`; // 70% saturation, 60% lightness for a vibrant color
}

dayBeforeBreak(week: KeyValue<Date, EventDetailModel[] | undefined>[],index:number,event:EventDetailModel):boolean{
   
  var dayBefore:any
  if(index != 0) dayBefore = week[index-1]
  else if(this.calendar.indexOf(week) == 0) return true
  else dayBefore = this.calendar[this.calendar.indexOf(week)-1][6]

  return dayBefore.value!.includes(event) && !dayBefore.value!.slice(0,3).includes(event);
}
}
