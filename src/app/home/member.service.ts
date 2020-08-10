import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';


@Injectable()
export class MemberService {
    constructor(private db: AngularFireDatabase) { }

    getChildMembers() {
        return this.db.list('childMembers').snapshotChanges().pipe(
            map(elements => {
                let members = [];
                let finalResult = [];
                elements.forEach((element, index) => {
                    members.push({ id: element.key, value: element.payload.val() });
                    finalResult.push({id: members[index].id, ...members[index].value});
                });
                return finalResult;
            })
        );
    }

    getAdultMembers() {
        return this.db.list('adultMembers').snapshotChanges().pipe(
            map(elements => {
                let members = [];
                let finalResult = [];
                elements.forEach((element, index) => {
                    members.push({ id: element.key, value: element.payload.val() });
                    finalResult.push({id: members[index].id, ...members[index].value});
                });
                return finalResult;
            })
        );
    }

    saveChildMember(childMember) {
        this.db.list('childMembers').push(childMember);
    }

    saveAdultMember(adultMember) {
        this.db.list('adultMembers').push(adultMember);
    }

    updateChildMember(childMember, newValues) {
        this.db.object(`childMembers/${childMember.id}`).update(newValues);
    }

    updateAdultMember(adultMember, newValues) {
        this.db.object(`adultMembers/${adultMember.id}`).update(newValues);
    }

    removeChildMember(childMember) {
        this.db.object(`childMembers/${childMember.id}`).remove();
    }

    removeAdultMember(adultMember) {
        this.db.object(`adultMembers/${adultMember.id}`).remove();
    }
}