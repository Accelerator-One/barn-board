import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }
  ngOnInit(): void { }

  changeProfilePicture() {
    const inputRef: any = document.getElementById('imgStore');
    inputRef.click();
  }

  async appendBlob(evt: any) {

    const fileRef: any = evt.target;
    const imgRef: any = document.getElementById('profileImg');
    let url: string = URL.createObjectURL(fileRef.files[0]);

    imgRef.src = url;
    URL.revokeObjectURL(url);
    this.extractBlob();

  }

  async extractBlob() {

    let canvasRef: any = document.createElement('canvas');
    const imgRef: any = document.getElementById('profileImg');
    let ctxtRef: CanvasRenderingContext2D = canvasRef.getContext('2d');

    canvasRef.width = 120;
    canvasRef.height = 120;

    let result = null;
    ctxtRef.drawImage(imgRef, 0, 0);
    await canvasRef.toBlob(async (res: any) => {
      result = await res.text();
      console.log(result);
      return result;
    });

  }

}
