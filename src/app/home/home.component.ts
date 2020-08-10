import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from './member.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { InfosComponent } from './infos/infos.component';
import { NewMemberDialogComponent } from './new-member-dialog/new-member-dialog.component';
import { fromEvent } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  private childMembers = [];
  private adultMembers = [];
  childDataSource;
  adultDataSource;
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'aboType', 'aboLength', 'startDate', 'endDate'];

  constructor(private router: Router, private memberService: MemberService, public dialog: MatDialog) { }

  @ViewChild(MatPaginator) childPaginator: MatPaginator;
  @ViewChild('adultPaginator') adultPaginator: MatPaginator;
  @ViewChild('childInput') childInput: ElementRef;
  @ViewChild('adultInput') adultInput: ElementRef;

  ngOnInit(): void {
    this.memberService.getChildMembers().subscribe(result => {
      this.childMembers = result;
      this.childDataSource = new MatTableDataSource(this.childMembers);
      this.childDataSource.paginator = this.childPaginator;
    })
    this.memberService.getAdultMembers().subscribe(result => {
      this.adultMembers = result;
      this.adultDataSource = new MatTableDataSource(this.adultMembers);
      this.adultDataSource.paginator = this.adultPaginator;
    })
  }

  ngAfterViewInit(): void {
    fromEvent(this.childInput.nativeElement, 'keyup').pipe(
      debounceTime(500),
      tap(() => {
        if (this.childInput.nativeElement.value !== '' || this.childInput.nativeElement.value !== null) {
          let tempMembers = [];
          this.childMembers.forEach(member => {
            if (member.firstName.toLowerCase().includes(this.childInput.nativeElement.value.toLowerCase()) || member.lastName.toLowerCase().includes(this.childInput.nativeElement.value.toLowerCase())) {
              tempMembers.push(member);
            }
          });
          this.childDataSource = new MatTableDataSource(tempMembers);
        } else {
          this.childDataSource = new MatTableDataSource(this.childMembers)
        }
      }),
    ).subscribe();
    fromEvent(this.adultInput.nativeElement, 'keyup').pipe(
      debounceTime(500),
      tap(() => {
        if (this.adultInput.nativeElement.value !== '' || this.adultInput.nativeElement.value !== null) {
          let tempMembers = [];
          this.adultMembers.forEach(member => {
            if (member.firstName.toLowerCase().includes(this.adultInput.nativeElement.value.toLowerCase()) || member.lastName.toLowerCase().includes(this.adultInput.nativeElement.value.toLowerCase())) {
              tempMembers.push(member);
            }
          });
          this.adultDataSource = new MatTableDataSource(tempMembers);
        } else {
          this.adultDataSource = new MatTableDataSource(this.adultMembers)
        }
      }),
    ).subscribe();
  }

  childDetails(element) {
    this.dialog.open(InfosComponent, {
      height: '660px',
      data: {
        member: element,
        type: 'child'
      }
    });
  }

  adultDetails(element) {
    this.dialog.open(InfosComponent, {
      data: {
        member: element,
        type: 'adult'
      }
    });
  }

  newMember() {
    this.dialog.open(NewMemberDialogComponent, {
      width: '40%'
    });
  }

}
