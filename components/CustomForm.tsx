import { useState } from "react"
import styles from "../styles/components/CustomForm.module.css"
import { toTitleCase } from "../utils"

export interface FormSection {
  name: string
  fields: string[]
}

export const CustomForm = ({ data, sections, submitFunction }) => {
  const [model, setModel] = useState(data)
  const [updating, setUpdating] = useState(false)
  const [errors, setErrors] = useState({})

  const saveChanges = async () => {
    try {
      await submitFunction(data.id, model)
      setErrors({})
      setUpdating(false)
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  return (
    <>
      <div className={styles.form}>
        {sections.map((section) => {
          return (
            <fieldset className={styles.formSection}>
              <legend>{section.name}</legend>
              {section.fields.map((field) => {
                return (
                  <>
                    <label htmlFor={field}>
                      {toTitleCase(field.replace("_", " "))}
                    </label>
                    <input
                      id={field}
                      type="text"
                      value={model[field]}
                      onChange={(e) => {
                        setModel({ ...model, [field]: e.target.value })
                        setUpdating(true)
                      }}
                      className={errors[field] ? styles.error : ""}
                    />
                  </>
                )
              })}
            </fieldset>
          )
        })}
        <button
          className={styles.submitButton}
          onClick={saveChanges}
          disabled={!updating}
        >
          Guardar Cambios
        </button>
      </div>
    </>
  )
}
