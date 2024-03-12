import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/shared/module/Event';

@Component({
  selector: 'app-add-event',

  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent {
  eventForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      date: ['', [Validators.required]],
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
    });
  }


  onSubmit() {
    if (this.eventForm.valid) {
      const newProduct = this.eventForm.value;
      this.eventService.createEvent(newProduct).subscribe(
        (event) => {
          console.log('Product created successfully:', event);
          this.eventForm.reset()
        },
        (error) => {
          console.error('Error creating product:', error);
          // Handle error (e.g., show an error message)
        }
      );
    }
  }

}
