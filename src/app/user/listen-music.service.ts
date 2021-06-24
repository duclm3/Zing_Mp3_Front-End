import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

import * as moment from 'moment';
import {Song} from '../model/song';
import {HttpClient} from '@angular/common/http';

class StateSong {
  state: string;
  currentTime: number;
  duration: number;
  statusSong?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ListenMusicService {
  private state: StateSong = {
    state: 'pause',
    currentTime: undefined,
    duration: undefined,
  };
  private state$: BehaviorSubject<StateSong> = new BehaviorSubject<StateSong>(this.state);
  public statusSong: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public song: Observable<Song>;
  public songObject: BehaviorSubject<Song>;
  public songs: Song[] = [];
  maxInput: number;
  audioObj = new Audio();
  audioEvents = [
    'ended',
    'error',
    'play',
    'playing',
    'pause',
    'timeupdate',
    'canplay',
    'loadedmetadata',
    'loadstart'
  ];
  title = 'AudioApp';
  currentTime = '00:00:00';
  duration = '00:00:00';
  seek = 0;

  constructor(private http: HttpClient) {
    this.songObject = new BehaviorSubject<Song>(JSON.parse(localStorage.getItem('song')));
    this.song = this.songObject.asObservable();
  }

  getState(): Observable<StateSong> {
    return this.state$.asObservable();
  }
  removeEvent(obj, events, handlerr) {
    events.forEach(event => {
      obj.removeEventListener(event, handlerr);
    });
  }

  streamObserver(url: string): Observable<any> {
    return new Observable(observer => {
      console.log('vao stream');
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();
      // this.duration = this.audioObj.duration;
      const handler = (eventTarget: Event) => {
        switch (eventTarget.type) {
          case 'pause':
            this.state$.next({
              state: 'pause',
              currentTime: this.audioObj.currentTime,
              duration: this.audioObj.duration
            });
            break;
          case 'playing':
            this.state$.next({
              state: 'playing',
              currentTime: this.audioObj.currentTime,
              duration: this.audioObj.duration
            });
            break;
        }
        this.seek = this.audioObj.currentTime;
        this.duration = this.timeFormat(this.audioObj.duration);
        this.currentTime = this.timeFormat(this.audioObj.currentTime);
        const hms = this.duration;   // your input string
        const a = hms.split(':'); // split it at the colons
        this.maxInput = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
      };
      this.addEvent(this.audioObj, this.audioEvents, handler);
      return () => {
        this.audioObj.pause();
        this.audioObj.currentTime = 0;
        this.removeEvent(this.audioObj, this.audioEvents, handler);
      };
    });
  }

  addEvent(obj, events, handlerr: any) {
    events.forEach( element => {
      obj.addEventListener(element, handlerr); // Khi nay e de sai tham so element thanh events
      // trong khi events da foreach o tren
      // console.log(handler);
    });
  }

  setVolume(event) {
    this.audioObj.volume = event.target.value;
  }
  openFile(song: Song) {
   this.streamObserver(song.songUrl).subscribe(event => {
      this.songObject.next(song);
    });
  }
  // @ts-ignore

  play() {
    this.audioObj.play().then().catch(error => console.log('error:', error));
  }

  pause() {
    this.audioObj.pause();
  }

  stop() {
    this.audioObj.pause();
    this.audioObj.currentTime = 0;
  }
  timeFormat(time, format= 'HH:mm:ss') {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }
  setSeekTo(ev) {
    this.audioObj.currentTime = ev.target.value;
  }
  getStatusSong(): Observable<boolean> {
    return this.statusSong.asObservable();
  }
  getSong(): Observable<Song> {
    return this.songObject.asObservable();
  }

  getCurrentTimeInMillisecond(): number {
    return this.audioObj.currentTime;
  }

  getDurationTimeInMillisecond(): number {
    return this.audioObj.duration;
  }
}
