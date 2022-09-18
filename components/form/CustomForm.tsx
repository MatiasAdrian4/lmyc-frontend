import { Fragment, useState } from "react"
import styles from "../../styles/components/CustomForm.module.css"
import { successPopup, toTitleCase } from "../../utils/utils"

interface FormField {
  /** Field's name */
  name: string
  /** Name used to show in the screen */
  displayName: string
  /** In case of a select, a list with all the possible values */
  selectOptions?: string[]
  /** Field's width (in %) */
  width: string
}
export interface FormSection {
  /** Section's title */
  title: string
  /** List of fields */
  fields: FormField[]
}

interface CustomFormProps {
  /** Model's name */
  modelName: string
  /** Initial data (if any) */
  data: any
  /** Field used to reference the model */
  dataId: any
  /** List containing all the sections */
  sections: FormSection[]
  /** Action to be called when the submit button is pressed */
  submitFunction: Function
}

export const CustomForm: React.FC<CustomFormProps> = ({
  modelName,
  data,
  dataId,
  sections,
  submitFunction
}: CustomFormProps) => {
  const [model, setModel] = useState(data)
  const [updating, setUpdating] = useState(false)
  const [errors, setErrors] = useState(null)

  const saveChanges = async () => {
    try {
      if (data) {
        await submitFunction(dataId, model)
        successPopup(`${modelName} actualizado satisfactoriamente.`)
      } else {
        /* if data is empty it means I'm creating a new instance */
        await submitFunction(model)
        successPopup(`${modelName} creado satisfactoriamente.`)
      }
      setErrors({})
      setUpdating(false)
    } catch (error) {
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
        </div>
      </div>
    </>
  )
}
