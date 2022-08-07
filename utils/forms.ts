import { FormSection } from "../components/CustomForm"
import { PRODUCT_CATEGORIES_WITH_EMPTY_OPTION } from "./constants"

export const CLIENT_SECTIONS: FormSection[] = [
  {
    title: "Datos Personales",
    fields: [
      { name: "nombre", displayName: "Nombre", width: "150px" },
      { name: "cuit", displayName: "Cuit", width: "150px" }
    ]
  },
  {
    title: "Dirección",
    fields: [
      { name: "direccion", displayName: "Dirección", width: "150px" },
      { name: "localidad", displayName: "Localidad", width: "150px" },
      { name: "codigo_postal", displayName: "Código Postal", width: "50px" }
    ]
  },
  {
    title: "Datos de contacto",
    fields: [
      { name: "telefono", displayName: "Teléfono", width: "150px" },
      { name: "email", displayName: "E-mail", width: "150px" }
    ]
  }
]

export const PRODUCT_SECTIONS: FormSection[] = [
  {
    title: "Descripción",
    fields: [
      { name: "codigo_en_pantalla", displayName: "Código", width: "50px" },
      { name: "detalle", displayName: "Detalle", width: "300px" },
      {
        name: "categoria",
        displayName: "Categoría",
        selectOptions: PRODUCT_CATEGORIES_WITH_EMPTY_OPTION,
        width: "150px"
      }
    ]
  },
  {
    title: "Disponibilidad",
    fields: [{ name: "stock", displayName: "Stock", width: "50px" }]
  },
  {
    title: "Precio",
    fields: [
      { name: "precio_costo", displayName: "Precio de Costo", width: "100px" }
    ]
  },
  {
    title: "Descuentos (en %)",
    fields: [
      { name: "desc1", displayName: "# 1", width: "50px" },
      { name: "desc2", displayName: "# 2", width: "50px" },
      { name: "desc3", displayName: "# 3", width: "50px" },
      { name: "desc4", displayName: "# 4", width: "50px" }
    ]
  },
  {
    title: "Agregados (en %)",
    fields: [
      { name: "flete", displayName: "Flete", width: "50px" },
      { name: "ganancia", displayName: "Ganancia", width: "50px" },
      { name: "iva", displayName: "Iva", width: "50px" },
      {
        name: "agregado_cta_cte",
        displayName: "Agregado Cta. Cte.",
        width: "50px"
      }
    ]
  }
]
