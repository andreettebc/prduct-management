import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should post a product', () => {
    const product = {
      id: '010',
      name: 'Tarjetas de crédito 10',
      description: 'Tarjeta de consumo bajo la modalidad de credito',
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
      date_release: '2023-02-01',
      date_revision: '2024-02-01',
    };

    service.postProduct(product).subscribe((response) => {
      expect(response).toBeTruthy();
      expect(response).toEqual(product);
    });

    const request = httpMock.expectOne(
      'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products'
    );
    expect(request.request.method).toBe('POST');
    request.flush(product);
  });

  it('should get products', () => {
    const mockResponse = [
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

    service.getProducts().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const request = httpMock.expectOne(
      'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products'
    );
    expect(request.request.method).toBe('GET');
    request.flush(mockResponse);
  });


  it('should put a product', () => {
    const product = {
      id: '010',
      name: 'Tarjetas de crédito 10',
      description: 'Tarjeta de consumo bajo la modalidad de credito',
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
      date_release: '2023-02-01',
      date_revision: '2024-02-01',
    };

    service.updateProducts(product).subscribe((response) => {
      expect(response).toBeTruthy();
      expect(response).toEqual(product);
    });

    const request = httpMock.expectOne(
      'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products'
    );
    expect(request.request.method).toBe('PUT');
    request.flush(product);
  });
 
  it('should delete product', () => {
    const idProduct = 1;
    const mockResponse = { success: true };

    service.deleteProducts(idProduct).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products?id1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

});
