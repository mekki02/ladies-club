import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MemberService } from '../member.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'new-member-form',
    templateUrl: './new-member-form.component.html',
    styleUrls: ['./new-member-form.component.scss']
})
export class NewMemberFormComponent {

    newMemberForm: FormGroup;
    titleCheckbox: string;
    mode: boolean;

    constructor(public dialogRef: MatDialogRef<NewMemberFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder, private memberService: MemberService, private datepipe: DatePipe) {
            if (this.data === 'adult') {
                this.mode = true;
            } else {
                this.mode = false;
            }
        }

    ngOnInit() {
        if (this.mode) {
            this.newMemberForm = this.fb.group({
                title: new FormControl(null, Validators.required),
                firstName: new FormControl(null, Validators.required),
                lastName: new FormControl(null, Validators.required),
                dateOfBirth: new FormControl(null, Validators.required),
                address: new FormControl(null, Validators.required),
                phoneNumber1: new FormControl(null, Validators.required),
                phoneNumber2: new FormControl(null, Validators.required),
                aboLength: new FormControl(null, Validators.required),
                aboType: new FormControl('full', Validators.required),
                startDate: new FormControl(null, Validators.required),
                endDate: new FormControl(null, Validators.required),
                findings: new FormControl(null, Validators.required),
                observations: new FormControl(null, Validators.required)
            });
        } else {
            this.newMemberForm = this.fb.group({
                gender: new FormControl(null, Validators.required),
                firstName: new FormControl(null, Validators.required),
                lastName: new FormControl(null, Validators.required),
                dateOfBirth: new FormControl(null, Validators.required),
                nameParent1: new FormControl(null, Validators.required),
                nameParent2: new FormControl(null),
                phoneNumberParent1: new FormControl(null, Validators.required),
                phoneNumberParent2: new FormControl(null),
                addressParent: new FormControl(null, Validators.required),
                aboLength: new FormControl(null, Validators.required),
                aboType: new FormControl('full'),
                startDate: new FormControl(null, Validators.required),
                endDate: new FormControl(null, Validators.required),
                findings: new FormControl(null, Validators.required),
                observations: new FormControl(null, Validators.required)
            });
        }
    }

    save() {
        if (this.mode) {
            let newMember = this.newMemberForm.value;
            newMember.dateOfBirth = this.datepipe.transform(newMember.dateOfBirth, 'yyyy/MM/dd');
            newMember.startDate = this.datepipe.transform(newMember.startDate, 'yyyy/MM/dd');
            newMember.endDate = this.datepipe.transform(newMember.endDate, 'yyyy/MM/dd');
            this.memberService.saveAdultMember(newMember);
            this.dialogRef.close();
        } else {
            let newMember = this.newMemberForm.value;
            newMember.dateOfBirth = this.datepipe.transform(newMember.dateOfBirth, 'yyyy/MM/dd');
            newMember.startDate = this.datepipe.transform(newMember.startDate, 'yyyy/MM/dd');
            newMember.endDate = this.datepipe.transform(newMember.endDate, 'yyyy/MM/dd');
            this.memberService.saveChildMember(newMember);
            this.dialogRef.close();
        }
    }

    cancel() {
        this.dialogRef.close();
    }
}