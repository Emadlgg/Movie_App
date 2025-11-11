import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Crew } from '../../../../core/models/crew.interface';

interface GroupedCrew {
  department: string;
  members: Crew[];
}

@Component({
  selector: 'app-crew-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crew-list.component.html',
  styleUrls: ['./crew-list.component.scss']
})
export class CrewListComponent implements OnInit {
  @Input() crew: Crew[] = [];
  groupedCrew: GroupedCrew[] = [];

  ngOnInit(): void {
    this.groupCrewByDepartment();
  }

  groupCrewByDepartment(): void {
    const departments = new Map<string, Crew[]>();

    this.crew.forEach(member => {
      if (!departments.has(member.department)) {
        departments.set(member.department, []);
      }
      departments.get(member.department)?.push(member);
    });

    this.groupedCrew = Array.from(departments.entries())
      .map(([department, members]) => ({
        department,
        members: members.slice(0, 10)
      }))
      .sort((a, b) => a.department.localeCompare(b.department));
  }
}