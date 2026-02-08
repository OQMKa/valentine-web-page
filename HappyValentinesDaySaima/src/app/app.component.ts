import { Component } from '@angular/core';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showSuccess = false;
  noButtonLeft = 0;
  noButtonTop = 0;
  noClickCount = 0;
  showPopup1 = false;
  showPopup2 = false;
  private isFirstRender = true;

  ngAfterViewInit() {
    // Set initial position next to Yes button after view is ready
    if (this.isFirstRender) {
      setTimeout(() => {
        this.setInitialPosition();
        this.isFirstRender = false;
      }, 0);
    }
  }

  setInitialPosition() {
    // Calculate center of screen
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Position No button to the right of where Yes button would be
    this.noButtonLeft = centerX + 100; // Adjust this value for spacing
    this.noButtonTop = centerY+73;
  }

  onYesClick() {
    this.showSuccess = true;
    this.sendNotification();
  }
  sendNotification() {
    const templateParams = {
      to_email: 'omkarnake17@gmail.com',  // Your email
      message: 'Saima haa boliii..! 🎉💕',
      timestamp: new Date().toLocaleString()
    };

    emailjs.send(
      'service_zkisf2j',      // Replace with your EmailJS Service ID
      'template_9mq26el',     // Replace with your EmailJS Template ID
      templateParams,
      'kgGQBFDSCGJ416kl0'       // Replace with your EmailJS Public Key
    ).then(
      (response) => {
        console.log('Email sent successfully!', response.status, response.text);
      },
      (error) => {
        console.log('Failed to send email:', error);
      }
    );
  }
  
    


  moveNoButton() {
    this.noClickCount++;

    if (this.noClickCount === 3) {
      this.showPopup1 = true;
      setTimeout(() => {
        this.showPopup1 = false;
      }, 5000);
    }else if(this.noClickCount === 7){
      this.showPopup2 = true;
      setTimeout(() => {
        this.showPopup2 = false;
      }, 5000);
    }

    // Get viewport dimensions
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Button dimensions
    const buttonWidth = 100;
    const buttonHeight = 50;

    // Safe margins from edges
    const margin = 20;

    // Calculate maximum positions
    const maxX = screenWidth - buttonWidth - margin;
    const maxY = screenHeight - buttonHeight - margin;

    // Generate random position within safe bounds
    const randomX = Math.floor(Math.random() * (maxX - margin)) + margin;
    const randomY = Math.floor(Math.random() * (maxY - margin)) + margin;

    this.noButtonLeft = randomX;
    this.noButtonTop = randomY;
  }
} 