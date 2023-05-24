import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContentMainComponent } from './content-main.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductsService } from '../services/products.service';
import { PaginatePipe, PaginationService } from 'ngx-pagination';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';
describe('ContentMainComponent', () => {
  let component: ContentMainComponent;
  let fixture: ComponentFixture<ContentMainComponent>;
  let httpMock: HttpTestingController;
  let productService: ProductsService;
  let modalService: NgbModal;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule,NgxPaginationModule],
      providers: [FormBuilder, PaginationService, NgbModal, ProductsService],
      declarations: [ContentMainComponent, PaginatePipe],
    }).compileComponents();
  });

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    productService = TestBed.inject(ProductsService);
    fixture = TestBed.createComponent(ContentMainComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(NgbModal);
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Prueba abrir modal
  it('should open modal with correct configuration', () => {
    const modalMock = '';
    spyOn(modalService, 'open');

    component.addProduct(modalMock);

    expect(component.actionModal).toBe('');
    expect(modalService.open).toHaveBeenCalledWith(component.actionModal, {
      windowClass: 'custom-width-variant-modal',
      size: 'lg',
    });
  });




    //resetear formulario 
    it('should reset the form', () => {
      
      component.formProduct.setValue({
        id: '001',
        name: 'Tarjetas de crédito 1',
        description: 'Tarjeta de consumo bajo la modalidad de credito',
        image: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        release_date: '2023-02-01T00:00:00.000+00:00',
        review_date: '2024-02-01T00:00:00.000+00:00',
       });
      component.resetForm();
      
      expect(component.formProduct.value).toEqual({
        id: null,
        name: null,
        description: null,
        image: null,
        release_date:  null,
        review_date: null,
      });
    });





  //Prueba obtener prodcutos
  it('should populate products with data from productService', () => {
    const productsMock = [
      {
        id: '001',
        name: 'Tarjetas de crédito 1',
        description: 'Tarjeta de consumo bajo la modalidad de credito',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        date_release: '2023-02-01T00:00:00.000+00:00',
        date_revision: '2024-02-01T00:00:00.000+00:00',
      },
      {
        id: '002',
        name: 'Tarjetas de crédito 2',
        description: 'Tarjeta de consumo bajo la modalidad de credito',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        date_release: '2023-02-01T00:00:00.000+00:00',
        date_revision: '2024-02-01T00:00:00.000+00:00',
      },
      {
        id: '003',
        name: 'Tarjetas de crédito 3',
        description: 'Tarjeta de consumo bajo la modalidad de credito',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        date_release: '2023-02-01T00:00:00.000+00:00',
        date_revision: '2024-02-01T00:00:00.000+00:00',
      },
    ];
    spyOn(productService, 'getProducts').and.returnValue(of(productsMock));

    component.getProducts();

    expect(component.products).toEqual(productsMock);
    expect(component.productsAux).toEqual(productsMock);
  });

  //pruebas de guardar productos

  it('should save product and show success message', () => {
    const formValue = {
      id: '1',
      name: 'Product A',
      description: 'Description A',
      image: 'image.jpg',
      release_date: '2023-01-01',
      review_date: '2023-02-01',
    };

    const response = {
      id: '1',
      name: 'Product A',
      description: 'Description A',
      image: 'image.jpg',
      release_date: '2023-01-01',
      review_date: '2023-02-01',
    };

    spyOn(productService, 'postProduct').and.returnValue(of(response));
    spyOn(modalService, 'dismissAll');

    component.formProduct.setValue(formValue);

    component.saveProduct();

    expect(component.new_product).toEqual({
      id: '1',
      name: 'Product A',
      description: 'Description A',
      logo: 'image.jpg',
      date_release: '2023-01-01',
      date_revision: '2023-02-01',
    });
    expect(productService.postProduct).toHaveBeenCalledWith(
      component.new_product
    );
    expect(modalService.dismissAll).toHaveBeenCalled();
    expect(component.successMessage).toBe('Proceso ejecutado con éxito');
  });

  //pruebas de manejo de productos
  it('should load product data into form', () => {
    const product = {
      id: 10,
      name: 'Tarjetas de crédito 10',
      description: 'Tarjeta de consumo bajo la modalidad de credito',
      image: 'image.jpg',
      release_date: '2023-01-01',
      review_date: '2023-02-01',
    };

    component.loadProduct(product);

    expect(component.formProduct.value).toEqual({
      id: 10,
      name: 'Tarjetas de crédito 10',
      description: 'Tarjeta de consumo bajo la modalidad de credito',
      image: 'image.jpg',
      release_date: '2023-01-01',
      review_date: '2023-02-01',
    });
  });

  //pruebas de búsqueda
  it('should filter products based on search term', () => {
    component.productsAux = [
      { name: 'Product A' },
      { name: 'Product B' },
      { name: 'Product C' },
    ];
    const searchTerm = 'Product';
    component.search(searchTerm);
    expect(component.products).toEqual([
      { name: 'Product A' },
      { name: 'Product B' },
      { name: 'Product C' },
    ]);
  });

  it('should filter products case-insensitive', () => {
    component.productsAux = [
      { name: 'Product A' },
      { name: 'Product B' },
      { name: 'Product C' },
    ];
    const searchTerm = 'product';
    component.search(searchTerm);
    expect(component.products).toEqual([
      { name: 'Product A' },
      { name: 'Product B' },
      { name: 'Product C' },
    ]);
  });

  //pruebas validaciones
  it('should return true when id control is invalid and touched', () => {
    component.formProduct = formBuilder.group({
      id: ['12345'],
    });
    component.formProduct.get('id')!.markAsTouched();
    component.formProduct.get('id')!.setErrors({ required: true });

    expect(component.idNoValid).toBe(true);
  });

  it('should return false when id control is valid', () => {
    component.formProduct = formBuilder.group({
      id: ['12345'],
    });
    component.formProduct.get('id')!.markAsTouched();

    expect(component.idNoValid).toBe(false);
  });

  it('should return true when name control is invalid and touched', () => {
    component.formProduct = formBuilder.group({
      name: [''],
    });
    component.formProduct.get('name')!.markAsTouched();
    component.formProduct.get('name')!.setErrors({ required: true });

    expect(component.nameNoValid).toBe(true);
  });

  it('should return false when name control is valid', () => {
    component.formProduct = formBuilder.group({
      name: ['Tarjetas de crédito'],
    });
    component.formProduct.get('name')!.markAsTouched();

    expect(component.nameNoValid).toBe(false);
  });

  it('should return true when description control is invalid and touched', () => {
    component.formProduct = formBuilder.group({
      description: [''],
    });
    component.formProduct.get('description')!.markAsTouched();
    component.formProduct.get('description')!.setErrors({ required: true });

    expect(component.descriptionNoValid).toBe(true);
  });

  it('should return false when description control is valid', () => {
    component.formProduct = formBuilder.group({
      description: ['Tarjeta de consumo bajo la modalidad de credito'],
    });
    component.formProduct.get('description')!.markAsTouched();

    expect(component.descriptionNoValid).toBe(false);
  });

  it('should return true when image control is invalid and touched', () => {
    component.formProduct = formBuilder.group({
      image: [''],
    });
    component.formProduct.get('image')!.markAsTouched();
    component.formProduct.get('image')!.setErrors({ required: true });

    expect(component.imageNoValid).toBe(true);
  });

  it('should return false when image control is valid', () => {
    component.formProduct = formBuilder.group({
      image: [
        'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
      ],
    });
    component.formProduct.get('image')!.markAsTouched();

    expect(component.imageNoValid).toBe(false);
  });


  it('should return true when release_date control is invalid and touched', () => {
    const formGroup: FormGroup = component.formProduct;
    formGroup.setControl('release_date', new FormControl('', Validators.required));
    formGroup.get('release_date')?.markAsTouched();
    expect(component.dateNoValid).toBe(true);
  });

  it('should return false when release_date control is valid and touched', () => {
    const formGroup: FormGroup = component.formProduct;
    formGroup.setControl('release_date', new FormControl('2023-01-01', Validators.required));
    formGroup.get('release_date')?.markAsTouched();
    expect(component.dateNoValid).toBe(false);
  });


  //pruebas de fechas
 
  it('should update reviewdate correctly', () => {
    component.releasedate = '2022-05-17';
    component.reviewDate();

    expect(component.reviewdate).toEqual('2023-05-16');
  });

  it('should format date correctly', () => {
    const date = new Date('2022-05-17');
    const formattedDate = component.formatDate(date);

    expect(formattedDate).toEqual('2022-05-16');
  });

 
 

});
