import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MemberService } from '../member.service';

@Component({
    selector: 'infos-member',
    templateUrl: './infos.component.html',
    styleUrls: ['./infos.component.scss']
})
export class InfosComponent implements OnInit{

     member;
     mode: boolean;
     editMemberForm: FormGroup;

    constructor(public dialogRef: MatDialogRef<InfosComponent>,
        @Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder, private datepipe: DatePipe, private memberService: MemberService) {
            this.member = this.data.member;
            if (this.data.type === 'adult') {
                this.mode = true;
            } else {
                this.mode = false;
            }
        }

    ngOnInit() {
        if (this.mode) {
            this.editMemberForm = this.fb.group({
                title: new FormControl(this.member.title, Validators.required),
                firstName: new FormControl(this.member.firstName, Validators.required),
                lastName: new FormControl(this.member.lastName, Validators.required),
                dateOfBirth: new FormControl(new Date(this.member.dateOfBirth), Validators.required),
                address: new FormControl(this.member.address, Validators.required),
                phoneNumber1: new FormControl(this.member.phoneNumber1, Validators.required),
                phoneNumber2: new FormControl(this.member.phoneNumber2, Validators.required),
                aboLength: new FormControl(this.member.aboLength, Validators.required),
                aboType: new FormControl(this.member.aboType, Validators.required),
                startDate: new FormControl(new Date(this.member.startDate), Validators.required),
                endDate: new FormControl(new Date(this.member.endDate), Validators.required),
                findings: new FormControl(this.member.findings, Validators.required),
                observations: new FormControl(this.member.observations, Validators.required)
            });
        } else {
            this.editMemberForm = this.fb.group({
                gender: new FormControl(this.member.gender, Validators.required),
                firstName: new FormControl(this.member.firstName, Validators.required),
                lastName: new FormControl(this.member.lastName, Validators.required),
                dateOfBirth: new FormControl(new Date(this.member.dateOfBirth), Validators.required),
                nameParent1: new FormControl(this.member.nameParent1, Validators.required),
                nameParent2: new FormControl(this.member.nameParent2),
                phoneNumberParent1: new FormControl(this.member.phoneNumberParent1, Validators.required),
                phoneNumberParent2: new FormControl(this.member.phoneNumberParent2),
                addressParent: new FormControl(this.member.addressParent, Validators.required),
                aboLength: new FormControl(this.member.aboLength, Validators.required),
                startDate: new FormControl(new Date(this.member.startDate), Validators.required),
                endDate: new FormControl(new Date(this.member.endDate), Validators.required),
                findings: new FormControl(this.member.findings, Validators.required),
                observations: new FormControl(this.member.observations, Validators.required)
            });
        }
        console.log(this.member)
    }

    save() {
        if (this.mode) {
            let newMember = this.editMemberForm.value;
            newMember.dateOfBirth = this.datepipe.transform(newMember.dateOfBirth, 'yyyy/MM/dd');
            newMember.startDate = this.datepipe.transform(newMember.startDate, 'yyyy/MM/dd');
            newMember.endDate = this.datepipe.transform(newMember.endDate, 'yyyy/MM/dd');
            this.memberService.updateAdultMember(this.member, newMember);
            this.dialogRef.close();
        } else {
            let newMember = this.editMemberForm.value;
            newMember.dateOfBirth = this.datepipe.transform(newMember.dateOfBirth, 'yyyy/MM/dd');
            newMember.startDate = this.datepipe.transform(newMember.startDate, 'yyyy/MM/dd');
            newMember.endDate = this.datepipe.transform(newMember.endDate, 'yyyy/MM/dd');
            this.memberService.updateChildMember(this.member, newMember);
            this.dialogRef.close();
        }
    }

    cancel() {
        this.dialogRef.close();
    }
}