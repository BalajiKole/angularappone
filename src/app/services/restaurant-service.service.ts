import { HttpClient,HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestaurantServiceService {
  public baseUrl = 'http://localhost:8080/data';
  //public imageUrl='http://localhost:8080/data/updaterestimage'
//  public  displayImageUrl:'http://localhost:8080/data/file';

  constructor(private http: HttpClient) {}

  public postResto(restoInfo: any): Observable<any> {
    console.log('I am in post method' + restoInfo);
    return this.http.post(`${environment.ServerUrl}/add`, restoInfo);
  }

  public getRestoById(restoId: any) {
    console.log('I am in get by id method');
    return this.http.get(`${environment.ServerUrl}/show/${restoId}`);
  }

  public getAllResto(): Observable<any> {
    console.log('I am in get all method');
    return this.http.get(`${environment.ServerUrl}/show`);
  }

  public changeResto(restoInfo: any) {
    console.log(' I am in  put method');
    return this.http.put(`${environment.ServerUrl}/change`, restoInfo);
  }

  public deleteById(restoId: any) {
    console.log('I am ni delete method');
    return this.http.delete(`${environment.ServerUrl}/delete/${restoId}`);
  }

  public changeById(id: number, restData: any) {
    return this.http.put(`${environment.ServerUrl}/change/${id}`, restData);
  }

  //changeStatus

  public setChangedStatus(id:number){
    return this.http.get(`${environment.ServerUrl}/changestatus/${id}`);
  }



//addimage
  public addImageInResto(file: any,id:number):any{
    let target:DataTransfer=<DataTransfer>(file.target);
    let fileList:FileList=target.files;
    let filel:File=fileList[0];
    const formdata: FormData = new FormData();
    formdata.append('file',filel,filel.name);
    console.log("formdata in service",formdata)
   formdata.append('file', file);
   console.log("Id in addImage service method"+ id)
    const req = new HttpRequest('PUT', `${environment.ServerUrlOne}/${id}`, formdata, {
      reportProgress: true,
      responseType: 'text'
    }
    );
    console.log("request object in service",req)
    return this.http.request(req);
  }

  // public getImage(name:string,id:number){
  //   return this.http.get(`${this.imageUrl}/${name}/${id}`)
  // }
 

}
