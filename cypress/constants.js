export const jwtToken = "lmyc_jwt"

export const backendUrl = Cypress.env().backendUrl

export const signupUrl = `${backendUrl}lubricentro_myc/account/signup/`

export const loginUrl = `${backendUrl}lubricentro_myc/account/login/`

export const productsUrl = `${backendUrl}lubricentro_myc/productos/`

export const resetDBUrl = `${backendUrl}lubricentro_myc/reset/`

export const testUser = {
  username: Cypress.env("lmycUsername"),
  password: Cypress.env("lmycPassword")
}

export const product15101 = {
  codigo_en_pantalla: 15101,
  detalle: "TAPA TB-81 VW POLO-GOLF (NAP)",
  stock: 2.0,
  precio_costo: 627.0,
  desc1: 49.0,
  desc2: 0.0,
  desc3: 0.0,
  desc4: 0.0,
  flete: 5.0,
  ganancia: 45.0,
  iva: 21.0,
  agregado_cta_cte: 10.0,
  categoria: "Tapas"
}

export const product9674 = {
  codigo_en_pantalla: 9674,
  detalle: "CORREA GATES 10 X 1285",
  stock: 0.0,
  precio_costo: 1238.8494767264,
  desc1: 49.0,
  desc2: 0.0,
  desc3: 0.0,
  desc4: 0.0,
  flete: 5.0,
  ganancia: 46.0,
  iva: 21.0,
  agregado_cta_cte: 6.0,
  categoria: "Correas"
}

export const product9816 = {
  codigo_en_pantalla: 9816,
  detalle: "CORREA GATES 4PK 0915",
  stock: 1.0,
  precio_costo: 1246.52957396352,
  desc1: 49.0,
  desc2: 0.0,
  desc3: 0.0,
  desc4: 0.0,
  flete: 5.0,
  ganancia: 45.578,
  iva: 21.0,
  agregado_cta_cte: 6.0,
  categoria: "Correas"
}

export const product10553 = {
  codigo_en_pantalla: 10553,
  detalle: "PH 3569 VW POLO 1.9(FRAM)",
  stock: 3.0,
  precio_costo: 1294.7,
  desc1: 49.0,
  desc2: 0.0,
  desc3: 0.0,
  desc4: 0.0,
  flete: 5.0,
  ganancia: 43.0,
  iva: 21.0,
  agregado_cta_cte: 10.0,
  categoria: "Filtros"
}

export const product191 = {
  codigo_en_pantalla: 191,
  detalle: "AC VALVOLINE PREMIUN BLUE 8600 15W40 X 20 LTS.",
  stock: 1.0,
  precio_costo: 19954.0,
  desc1: 0.0,
  desc2: 0.0,
  desc3: 0.0,
  desc4: 0.0,
  flete: 0.0,
  ganancia: 20.0,
  iva: 21.0,
  agregado_cta_cte: 5.0,
  categoria: "Lubricantes"
}

export const product265 = {
  codigo_en_pantalla: 265,
  detalle: "AC ELAION F-50 (OFERTA)",
  stock: 5.0,
  precio_costo: 6160.0,
  desc1: 0.0,
  desc2: 0.0,
  desc3: 0.0,
  desc4: 0.0,
  flete: 0.0,
  ganancia: 50.0,
  iva: 21.0,
  agregado_cta_cte: 10.0,
  categoria: "Lubricantes"
}

export const product64049 = {
  codigo_en_pantalla: 64049,
  detalle: "PORTALAMPARA F-100 2 POLOS",
  stock: 0.0,
  precio_costo: 40.95,
  desc1: 0.0,
  desc2: 0.0,
  desc3: 0.0,
  desc4: 0.0,
  flete: 0.0,
  ganancia: 40.0,
  iva: 21.0,
  agregado_cta_cte: 0.0,
  categoria: "Electricidad"
}

export const product10747 = {
  codigo_en_pantalla: 10747,
  detalle: "CA 8736 FORD KA (FRAM)",
  stock: 1.0,
  precio_costo: 1241.2,
  desc1: 0.0,
  desc2: 0.0,
  desc3: 0.0,
  desc4: 0.0,
  flete: 5.0,
  ganancia: 42.0,
  iva: 21.0,
  agregado_cta_cte: 10.0,
  categoria: "Filtros"
}

export const product15116 = {
  codigo_en_pantalla: 15116,
  detalle: "TAPA TB-47 FIESTA-KA(NAP)",
  stock: 5.0,
  precio_costo: 1330.0,
  desc1: 49.0,
  desc2: 0.0,
  desc3: 0.0,
  desc4: 0.0,
  flete: 5.0,
  ganancia: 45.6,
  iva: 21.0,
  agregado_cta_cte: 7.0,
  categoria: "Tapas"
}

export const product9668 = {
  codigo_en_pantalla: 9668,
  detalle: "CORREA GATES 10 X 970",
  stock: 0.0,
  precio_costo: 1022.41860291648,
  desc1: 49.0,
  desc2: 0.0,
  desc3: 0.0,
  desc4: 0.0,
  flete: 5.0,
  ganancia: 47.098,
  iva: 21.0,
  agregado_cta_cte: 6.0,
  categoria: "Correas"
}

export const product10518 = {
  codigo_en_pantalla: 10518,
  detalle: "CA 11104 FIATUNO 1.4 (FRAM)",
  stock: 6.0,
  precio_costo: 727.3060008073303,
  desc1: 0.0,
  desc2: 0.0,
  desc3: 0.0,
  desc4: 0.0,
  flete: 5.0,
  ganancia: 40.0,
  iva: 21.0,
  agregado_cta_cte: 6.0,
  categoria: "Filtros"
}

export const product9691 = {
  codigo_en_pantalla: 9691,
  detalle: "CORREA GATES 10X1030",
  stock: 1.0,
  precio_costo: 1257.0,
  desc1: 49.0,
  desc2: 0.0,
  desc3: 0.0,
  desc4: 0.0,
  flete: 5.0,
  ganancia: 45.6,
  iva: 21.0,
  agregado_cta_cte: 6.0,
  categoria: "Correas"
}

export const product9712 = {
  codigo_en_pantalla: 9712,
  detalle: "CORREA GATES 13 X 1875",
  stock: 5.0,
  precio_costo: 3158.043913024,
  desc1: 49.0,
  desc2: 0.0,
  desc3: 0.0,
  desc4: 0.0,
  flete: 5.0,
  ganancia: 45.4193,
  iva: 21.0,
  agregado_cta_cte: 6.0,
  categoria: "Correas"
}

export const product15 = {
  codigo_en_pantalla: 15,
  detalle: "AC YPF ELAION MOTO 4T 20W50 X 1 LITRO",
  stock: 0.0,
  precio_costo: 523.5,
  desc1: 0.0,
  desc2: 0.0,
  desc3: 0.0,
  desc4: 0.0,
  flete: 0.0,
  ganancia: 50.0,
  iva: 21.0,
  agregado_cta_cte: 10.0,
  categoria: "Lubricantes"
}

export const product10700 = {
  codigo_en_pantalla: 10700,
  detalle: "CA 2718 FIAT 128 SE (FRAM)",
  stock: 0.0,
  precio_costo: 1556.6228336082913,
  desc1: 35.0,
  desc2: 0.0,
  desc3: 0.0,
  desc4: 0.0,
  flete: 5.0,
  ganancia: 40.0,
  iva: 21.0,
  agregado_cta_cte: 6.0,
  categoria: "Filtros"
}

export const testProducts = [
  product15101,
  product9674,
  product9816,
  product10553,
  product191,
  product265,
  product64049,
  product10747,
  product15116,
  product9668,
  product10518,
  product9691,
  product9712,
  product15,
  product10700
]
