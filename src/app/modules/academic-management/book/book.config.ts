import { CellrendererComponent } from "src/app/components/ecm-ag-grid/cellrenderer/cellrenderer.component";

export const BookConfigs = {
    columnDefs: [
        {
          field: 'Actions',
          width: 85,
          cellRendererFramework: CellrendererComponent,
          pinned: 'left',
          lockPinned: true,
        },
        {
          headerName: 'S.No',
          valueGetter: "node.rowIndex + 1",
          width: 70,
          resizable: true
        },
        {
          headerName: 'Subject',
          field: 'subject',
          width: 160,
          filter: true,
          floatingFilter: true,
          resizable: true
        },
        {
          headerName: 'Book Name',
          field: 'bookname',
          width: 300,
          filter: true,
          floatingFilter: true,
          resizable: true
        },
        {
          headerName: 'Publisher',
          field: 'publisher',
          width: 300,
          filter: true,
          floatingFilter: true,
          resizable: true
        },
        {
            headerName: 'Author',
            field: 'author',
            width: 200,
            filter: true,
            floatingFilter: true,
            resizable: true
          }
      ],
      courseArr: [
        {
          headerName: '',
          // field: '',
          width: 10,
          // filter: true,
          // floatingFilter: true,
          resizable: true,
          cellClass: 'br'
        },
        {
          headerName: 'Code',
          field: 'Code',
          width: 100,
          filter: true,
          floatingFilter: true,
          resizable: true,
          cellClass: 'br'
        },
        {
          headerName: 'CourseCategory',
          field: 'CourseCategory',
          width: 140,
          filter: true,
          floatingFilter: true,
          resizable: true,
          cellClass: 'br'
        },
        {
          headerName: 'Course',
          field: 'Course',
          width: 180,
          filter: true,
          floatingFilter: true,
          resizable: true,
          cellClass: 'br'
        },
        {
          headerName: 'Syllabus',
          field: 'Syllabus',
          width: 110,
          filter: true,
          floatingFilter: true,
          resizable: true,
          cellClass: 'br'
        },
        // {
        //   headerName: 'Age From',
        //   field: 'AgeFrom',
        //   width: 100,
        //   filter: true,
        //   floatingFilter: true,
        //   resizable: true,
        //   cellClass: 'br'
        // },
        // {
        //   headerName: 'Age Till',
        //   field: 'AgeTill',
        //   width: 100,
        //   filter: true,
        //   floatingFilter: true,
        //   resizable: true,
        // },
      ]
}