import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { IProduct } from '../interfaces/product.interface';

@Component({
  selector: 'app-content-main',
  templateUrl: './content-main.component.html',
  styleUrls: ['./content-main.component.scss'],
})
export class ContentMainComponent implements OnInit {
  products: any[] = [];
  productsAux: any[] = [];
  actionModal = '';
  formProduct!: FormGroup;
  minIdLength: number = 3;
  maxIdLength: number = 10;
  minNameLength: number = 5;
  maxNameLength: number = 100;
  minDescriptionLength: number = 10;
  maxDescriptionLength: number = 200;
  pageActual = 1;
  successMessage: string = '';

  releasedate:string = '';
  reviewdate: string ='';

  public new_product: IProduct = {
    id: ' ',
    name: ' ',
    description: ' ',
    logo: ' ',
    date_release: ' ',
    date_revision: ' ',
  };
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.newProduct();
  }

  


  //abrir modal
  addProduct(modal: any) {
    this.actionModal = '';
    this.modalService.open(modal, {
      windowClass: 'custom-width-variant-modal',
      size: 'lg',
    });
  }

  //consultar productos
  getProducts() {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
      this.productsAux = this.products;
    });
  }

  //reset formulario
  resetForm() {
    this.formProduct.reset();
  }

  //guardar o actualziar productos
  saveProduct(): void {
    this.new_product.id = this.formProduct.value.id;
    this.new_product.name = this.formProduct.value.name;
    this.new_product.description = this.formProduct.value.description;
    this.new_product.logo = this.formProduct.value.image;
    this.new_product.date_release = this.formProduct.value.release_date;
    this.new_product.date_revision = this.formProduct.value.review_date;

    this.productService.postProduct(this.new_product).subscribe((data: any) => {
      if (data.id !== undefined || data.id !== null) {
        this.modalService.dismissAll();
        this.successMessage = 'Proceso ejecutado con éxito';
      }
    });
  }

  //borrar productos
  //deleteProduct(id: number, error: any): void {}

  // manejo de productos
  newProduct() {
    this.formProduct = this.fb.group({
      id: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.maxLength(this.maxIdLength),
          Validators.minLength(this.minIdLength),
        ],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(this.maxNameLength),
          Validators.minLength(this.minNameLength),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.maxLength(this.maxDescriptionLength),
          Validators.minLength(this.minDescriptionLength),
        ],
      ],
      image: ['', [Validators.required]],
      release_date: ['', [Validators.required]],
      review_date: ['', [Validators.required]],
    });
  }

  loadProduct(product: any) {
    this.formProduct.reset({
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.image,
      release_date: product.release_date,
      review_date: product.review_date,
    });
  }

  //búsqueda
  search(busqueda: string) {
    this.products = this.productsAux.filter(function (res) {
      return res.name.toLowerCase().includes(busqueda.toLowerCase());
    });
  }

  //Validaciones
  get idNoValid() {
    return (
      this.formProduct.get('id')!.invalid && this.formProduct.get('id')!.touched
    );
  }

  get nameNoValid() {
    return (
      this.formProduct.get('name')!.invalid &&
      this.formProduct.get('name')!.touched
    );
  }

  get descriptionNoValid() {
    return (
      this.formProduct.get('description')!.invalid &&
      this.formProduct.get('description')!.touched
    );
  }

  get imageNoValid() {
    return (
      this.formProduct.get('image')!.invalid &&
      this.formProduct.get('image')!.touched
    );
  }

  get dateNoValid() {
    return (
      this.formProduct.get('release_date')!.invalid &&
      this.formProduct.get('release_date')!.touched
    );
  }

 
  reviewDate() {
    const fecha = new Date(this.releasedate);
    fecha.setFullYear(fecha.getFullYear() + 1);
    this.reviewdate = this.formatDate(fecha);
  }

  formatDate(fecha: Date): string {
    const day = fecha.getDate().toString().padStart(2, '0');
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const year = fecha.getFullYear().toString();
    return `${year}-${month}-${day}`;
  }

 
}
