import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { contentService } from '../shared/content.service';


Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  categoryStats: any[] = [];
  userStats: any[] = [];
  fileTypeStats: any[] = [];
  categoryPieStats: any[] = [];
  userPieStats: any[] = [];
  fileTypePieStats: any[] = [];
  recentUploads: any[]=[];

  sideNavStatus: boolean = false;
  @ViewChild('categoryChart', { static: false }) categoryChartRef!: ElementRef;
@ViewChild('userChart', { static: false }) userChartRef!: ElementRef;
@ViewChild('fileTypeChart', { static: false }) fileTypeChartRef!: ElementRef;
@ViewChild('categoryPieChart', { static: false }) categoryPieChartRef!: ElementRef;
@ViewChild('userPieChart', { static: false }) userPieChartRef!: ElementRef;
@ViewChild('fileTypePieChart', { static: false }) fileTypePieChartRef!: ElementRef;
  



  constructor(private http: HttpClient,private contentService:contentService) { }

  ngOnInit() {
    this.getRecentUploads();
  }
    
 


  ngAfterViewInit(){
    this.fetchStats1();
    this.fetchStats2();
    this.fetchStats3();
  }
  
 

  getRecentUploads() {

    this.contentService.getAllContents().subscribe(

      (comments: any[]) => {

        // Sort comments by ContentID in descending order

        comments.sort((a, b) => b.ContentID - a.ContentID);

        this.recentUploads = comments.slice(0, 100); // Get the top 5 recent comments

       

        // Reverse the order to get the bottom contents

        this.recentUploads.reverse();

      },

      (error: any) => {

        console.log(error); // Handle the error appropriately

      }

    );

  }
 
 
  fetchStats1() {
    this.http.get<any[]>('https://localhost:7250/api/Contents/api/contents/aggregateByCategory').subscribe(
      (response) => {
        this.categoryStats = response;
        this.renderCategoryChart();
       
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  fetchStats2() {
    this.http.get<any[]>('https://localhost:7250/api/Contents/api/contents/aggregateByUser').subscribe(
      (response) => {
        this.userStats = response;
        this.renderUserChart();
      
      },
      (error) => {
        console.error(error);
      }
    );
  }
  fetchStats3() {
    this.http.get<any[]>('https://localhost:7250/api/Contents/api/contents/aggregateByFileType').subscribe(
      (response) => {
        this.fileTypeStats = response;
        this.renderFileTypeChart();
        
        
      },
      (error) => {
        console.error(error);
      }
    );
  }
  renderCategoryChart() {
    const ctx = this.categoryChartRef.nativeElement.getContext('2d');
    const labels = this.categoryStats.map(stat => stat.categoryName);
    const data = this.categoryStats.map(stat => stat.contentCount);
   

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'No. of files by category',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(54, 162, 235, 1)',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        
        plugins: {
          tooltip: {
            callbacks: {
              label: (context: any) => { // Add type annotation
                const value: number = context.raw; // Add type annotation
                const total: number = data.reduce((a: number, b: number) => a + b, 0); // Add type annotation
                const percentage: string = ((value / total) * 100).toFixed(2);
                return `Count: ${value}, Contribution: ${percentage}%`;
              }
            }
          }
        }
      },
    });
  }
  renderUserChart() {
    const ctx = this.userChartRef.nativeElement.getContext('2d');
    const labels = this.userStats.map(stat => stat.userName);
    const data = this.userStats.map(stat => stat.contentCount);
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'No. of Content',
            data: data,
            backgroundColor: 'rgba(144, 238, 144, 0.5)', // Light green color
            borderColor: 'rgba(144, 238, 144, 1)', // Light green color
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context: any) => { // Add type annotation
                const value: number = context.raw; // Add type annotation
                const total: number = data.reduce((a: number, b: number) => a + b, 0); // Add type annotation
                const percentage: string = ((value / total) * 100).toFixed(2);
                return `Count: ${value}, Contribution: ${percentage}%`;
              }
            }
          }
        }
      },
    });
  }
  
  renderFileTypeChart() {
    const ctx = this.fileTypeChartRef.nativeElement.getContext('2d');
    const labels = this.fileTypeStats.map(stat => stat.fileType);
    const data = this.fileTypeStats.map(stat => stat.contentCount);
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'No. of Different Files',
            data: data,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context: any) => { // Add type annotation
                const value: number = context.raw; // Add type annotation
                const total: number = data.reduce((a: number, b: number) => a + b, 0); // Add type annotation
                const percentage: string = ((value / total) * 100).toFixed(2);
                return `Count: ${value}, Contribution: ${percentage}%`;
              }
            }
          }
        }
      },
    });
  }

 
  
 
 
  
}