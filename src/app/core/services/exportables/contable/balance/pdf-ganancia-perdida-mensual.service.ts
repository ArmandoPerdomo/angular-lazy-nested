import {Injectable} from '@angular/core';
import { ExportService, imagenconstr } from '../../parent/export.service';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class PdfContableMensualService extends ExportService {

  constructor() {
    super();
  }
  
  getMonto(data: any, desc: any = ''){
    let acum: Number = 0
      data.forEach(a =>{
        if(a.data.desc == desc)
          acum = a.data.saldoActual;
      })
      return acum;
  }


  public pdfMensual(dout: any,din:any, ahnos: any,total:any, tipo: number = 1) {
    var self = this;
    var title ="";
    var title2 ="";

    if (tipo ==1){
      title ='GANANCIAS Y PÉRDIDAS MENSUAL';
      title2 ='Ganancias y pérdidas mensual'
    } else{
      title = 'BALANCE GENERAL MENSUAL'
      title2 ='Balance general mensual';

    }
      
    var dd = {
      info: 
        {
            title: title2
        },
      header: function(currentPage, pageCount){/*Tabla del header*/
          return {
              table: {
            widths: ['20%','56%','20%'],
            heights:['auto','auto','auto'],
          body: 
          [
            [//Primera fila
                {//Imagen
                    image: imagenconstr,
                    width: 140,
                    height:80
                },
                {//Membrete
                    text:'\nAv. Los Pinos, entre calle Pomagas y Los Mangos,Casa Nro. 35 Urb. La Florida Norte, Zona Portal 1050 Ofi. +58212731.2087',
                    alignment:'center', fontSize: 12, width: 20
                },
                {//Detalles
                    columns:[
                       [//Fila
                            '\n\n',
                            {text:'Fecha:',bold:true},
                            {text:'Hora:',bold:true},
                             {text:'Página:',bold:true}
                            
                       ],
                          [
                              '\n\n',
                               self.currentDate[0],
                                       self.currentDate[1] + ' ' + self.currentDate[2] + self.currentDate[3],
                             currentPage.toString()+'/'+ pageCount.toString() //Implement new Date
                          ]
                        ],
                        alignment:'left'
                }
            ],//Fin Primera Fila
            [//Segunda fila
               {
                   text: title, style: 'header', colSpan: 3, alignment: 'center'
               }
                   , {}, {}
            ],//Fin Segunda Fila
          ]
        },
        layout: 'noBorders',
              style: 'headerTable'
          }
      },
    content: [
      self.buidlContent(dout,din, ahnos, total),
    ],
    styles: {
  
      headerTable:{
          margin: [5, 10, 10,8]
      },
  
      header: {
        fontSize: 18,
        bold: true,
        alignment: 'justify'
      }
    
      },
      pageSize: 'LEGAL',
      
      pageMargins: [30, 140, 10, 20],//Content margins
      defaultStyle: {
          fontSize: 8
      }
    
  }
  

    pdfMake.createPdf(dd).open();
  }


  buidlContent(dat, din, ahnos, total){
    var body = [];

    let i = 0;
    ahnos.forEach(a => {
      var objtable = {
        table:
        { 
          body:[]
        }, layout: 'noBorders'
      }

      var  rowAhno = [];
      rowAhno.push({text:a, bold: 'true', fontSize: 14, alignment: 'center'});
      

      var rowInfo = [];
      rowInfo.push(this.buildBody(dat, din,i,total,a));

      objtable.table.body.push(rowAhno);
      objtable.table.body.push(rowInfo);

      i++; 
      body.push(objtable);
    });

   return body
  }



  buildBody(dat, din, i, total, ahno) {
    var body = []
    var layout =  {
      hLineWidth: function (i, node) {
        return (i === 0 || i === node.table.body.length) ? 0 : 1;
      },
      vLineWidth: function (i, node) {
        return (i === 0 || i === node.table.widths.length) ? 0 : 0;
      },
      hLineColor: function (i, node) {
        return (i === 0 || i === node.table.body.length) ? 'white' : 'gray';
      },
      vLineColor: function (i, node) {
        return (i === 0 || i === node.table.widths.length) ? 'white' : 'white';
      },
      paddingLeft: function(i, node) { return 0; },
			paddingRight: function(i, node) { return 0; },
			paddingTop: function(i, node) { return 2; },
			paddingBottom: function(i, node) { return 2; },
    }
    var objtable = {
      table:
      {
        widths: [104, 291,112],
        body:[]
      }, layout: 'lightHorizontalLines'
    }
    var objtableFooter = {
      table:
      {
        widths: [104, 310,93],
        body:[]
      }, layout: 'lightHorizontalLines'
    }
    
    var rowFoot = []

    var vacio = [{},{},{}];
    var rowHerader =
    [
      {text: 'Código', bold: true},
      {text: 'Descripción',bold: true},
      {text: 'Monto',bold: true,  alignment: 'right'}
    ];

    objtable.table.body.push(rowHerader);
    objtable.table.body.push(vacio);
    body.push(objtable);


    dat.forEach(a => {
     
      var objtable1 = {
        table:
        {
          widths: [120, 310,110],
          body:[]
        }, layout: layout
      }
      var objtable2 = {
        table:
        {
          widths: [120, 310,110],
          body:[]
        }, layout: layout, colSpan: 3
      }
      
      // Creando rows para la tabla 

      var rowFirst1 = [];
      var rowFirst2 = [];
      var rowFirst3 = [];

      if (a.children.length == 0 || a.children == [] && din.Nivel == 1)
      {
        //! 1 NIVEL
        //insertando Informacion nivel 1
        a.data.yeari.forEach((aa, aindex) => {
          if( i== aindex){
           (din.Nivel == 1)? rowFirst1.push({text:a.data.code},{text:a.data.desc},{text: this.moneyTrans(aa),alignment:'right'}) :rowFirst1.push({text:a.data.code, bold:true},{text:a.data.desc, bold:true},{text: this.moneyTrans(aa),alignment:'right', bold:true}) ;
          }
        });

  
        //insertando nivel 1
        objtable1.table.body.push(rowFirst1);
      }else{

        a.children.forEach(b => {
          var objtable3 = {
            table:
            {
              widths: [120, 310,110],
              body:[]
            }, layout: layout, colSpan: 3
          }
          
          // Creando rows para la tabla 
          var rowSecond1 = [];
          var rowSecond2 = [];
          var rowSecond3 = [];
         
          if(din.Nivel == 2){
            //! 2 NIVELES
            b.data.yeari.forEach((bb, bindex) => {
              if(i ==bindex){
                //insertando Informacion nivel 2
                rowSecond1.push({text:b.data.code},{text:b.data.desc, margin:[10,0,0,0]},{text: this.moneyTrans(bb),alignment:'right'});
              }           
            });
            //insertando nivel 2
             objtable2.table.body.push(rowSecond1);
          
     
          }else{
           
            b.children.forEach(c => {
              var objtable4 = {
                table:
                {
                  widths: [120, 310,110],
                  body:[]
                }, layout: layout, colSpan: 3
              }
    
              // Creando rows para la tabla 
              var rowThird1 = [];
              var rowThird2 = [];
              var rowThird3 = [];

              if(din.Nivel == 3){
                //! 3 NIVELES 
                  c.data.yeari.forEach((cc, cindex) => {
                    if(i ==cindex){
                        //insertando Informacion nivel 3
                        rowThird1.push({text:c.data.code},{text:c.data.desc, margin:[20,0,0,0]},{text: this.moneyTrans(cc),alignment:'right'});
                    }
                  });

                  //insertando nivel 3
                  objtable3.table.body.push(rowThird1);
              }else{
                c.children.forEach(d  => {
                  // Creando rows para la tabla 
                  var rowFourth1 = [];
                  d.data.yeari.forEach((dd, dindex) => {
                     //insertando Informacion nivel 4
                      if(i ==dindex){
                      rowFourth1.push(
                        {text:d.data.code},
                        {text:d.data.desc, margin:[30,0,0,0]},
                        {text:this.moneyTrans(dd),alignment:'right'}
                      );
                    }
                  });
                 
                  //insertando nivel 3
                  (c.children.length != 0 || c.children != [])?objtable4.table.body.push(rowFourth1): objtable4.table.body.push({},{},{});
                  
                });
              
                c.data.yeari.forEach((cc, cindex) => {
                  if(i ==cindex){
                      //insertando Informacion nivel 3
                      rowThird1.push({text:c.data.code,bold: true},{text:c.data.desc,bold: true, margin:[20,0,0,0]},{});
                      rowThird2.push(objtable4,{},{});
                      rowThird3.push(
                        {},
                        {text:'TOTAL DE '+c.data.desc+' :',bold: true,alignment:'right' },
                        {text: this.moneyTrans(cc), bold: true,alignment:'right'}
                        );
                  }
                  
                });

                      //insertando nivel 3
                      objtable3.table.body.push(rowThird1);
                      objtable3.table.body.push(rowThird2);
                      objtable3.table.body.push(rowThird3);
                    }
              });
              b.data.yeari.forEach((bb, bindex) => {
                if(i ==bindex){
                  //insertando Informacion nivel 2
                  rowSecond1.push({text:b.data.code,bold: true},{text:b.data.desc,bold: true, margin:[10,0,0,0]},{});
                  rowSecond2.push(objtable3,{},{});
                  rowSecond3.push(
                    {},
                    {text:'TOTAL DE '+b.data.desc+' :',bold: true,alignment:'right' },
                    {text: this.moneyTrans(bb),bold: true,alignment:'right'}
                
                  );
                }
                        
              });
            //insertando nivel 2
            objtable2.table.body.push(rowSecond1);
            objtable2.table.body.push(rowSecond2);
            objtable2.table.body.push(rowSecond3);

          }
          
        });
        
        a.data.yeari.forEach((aa, aindex) => {
          if( i== aindex){
             //insertando Informacion nivel 1
            rowFirst1.push({text:a.data.code,bold: true},{text:a.data.desc,bold: true},{});
            rowFirst2.push(objtable2,{},{});
            rowFirst3.push(
              {},
              {text:'TOTAL DE '+a.data.desc+' :',bold: true,alignment:'right' },
              {text: this.moneyTrans(aa),bold: true,alignment:'right'}
            );
          }
        });
       
       
        //insertando nivel 1
        objtable1.table.body.push(rowFirst1);
        objtable1.table.body.push(rowFirst2);
        objtable1.table.body.push(rowFirst3);


    }
   
    body.push(objtable1);
    });

    //Informacion de footer
    total.forEach((t, tindex) => {
      if(i== tindex){
        rowFoot.push(
          {text:'',	fillColor: '#cccccc'},
          {text:'TOTAL '+ahno+' :',bold: true,alignment:'right' ,	fillColor: '#cccccc'},
          {text: this.moneyTrans(t),bold: true,alignment:'right',	fillColor: '#cccccc'}
        );
      }
    });

    //insertnado el footer
    objtableFooter.table.body.push(vacio);
    objtableFooter.table.body.push(rowFoot);

    var br = { text:'\n'};

    body.push(objtableFooter);
    body.push(br);
    return body;
  }

}
