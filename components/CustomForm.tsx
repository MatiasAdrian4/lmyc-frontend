import { Fragment, useState } from "react"
import styles from "../styles/components/CustomForm.module.css"
import { toTitleCase } from "../utils/utils"

interface FormField {
  name: string
  displayName: string
  selectOptions?: string[]
  width: string
}
export interface FormSection {
  title: string
  fields: FormField[]
}

interface CustomFormProps {
  modelName: string
  data: any
  dataId: any
  sections: FormSection[]
  submitFunction: Function
}

const CustomForm: React.FC<CustomFormProps> = ({
  modelName,
  data,
  dataId,
  sections,
  submitFunction
}: CustomFormProps) => {
  const [model, setModel] = useState(data)
  const [updating, setUpdating] = useState(false)
  const [errors, setErrors] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const saveChanges = async () => {
    try {
      if (data) {
        await submitFunction(dataId, model)
        setSuccessMessage(`${modelName} actualizado satisfactoriamente.`)
      } else {
        /* if data is empty it means I'm creating a new instance */
        await submitFunction(model)
        setSuccessMessage(`${modelName} creado satisfactoriamente.`)
      }
      setErrors({})
      setUpdating(false)
    } catch (error) {
      setSuccessMessage("")
      setErrors(error.response.data)
    }
  }

  return (
    <>
      <div>
        {sections.map((section, i) => {
          return (
            <fieldset className={styles.formSection} key={i}>
              <legend>{section.title}</legend>
              {section.fields.map((field, j) => {
                return (
                  <Fragment key={j}>
                    <label htmlFor={field.name}>{field.displayName}</label>
                    {!field.selectOptions && (
                      <input
                        id={field.name}
                        type="text"
                        value={model ? model[field.name] : null}
                        onChange={(e) => {
                          setModel({ ...model, [field.name]: e.target.value })
                          setSuccessMessage("")
                          setUpdating(true)
                        }}
                        className={
                          errors && errors[field.name] ? styles.error : ""
                        }
                        style={{ width: field.width }}
                      />
                    )}
                    {field.selectOptions && (
                      <select
                        value={model ? model[field.name] : null}
                        onChange={(e) => {
                          setModel({ ...model, [field.name]: e.target.value })
                          setSuccessMessage("")
                          setUpdating(true)
                        }}
                      >
                        {field.selectOptions.map((value) => {
                          return (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          )
                        })}
                      </select>
                    )}
                  </Fragment>
                )
              })}
            </fieldset>
          )
        })}
        <div className={styles.submitSection}>
          <button onClick={saveChanges} disabled={!updating}>
            Guardar Cambios
          </button>
          {errors && (
            <ul>
              {Object.keys(errors).map((key) => {
                return (
                  <li key={key} style={{ color: "red" }}>
                    {toTitleCase(key.replaceAll("_", " "))}: {errors[key]}
                  </li>
                )
              })}
            </ul>
          )}
          {successMessage && (
            <ul>
              <li style={{ color: "green" }}>{successMessage}</li>
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

export default CustomForm
