import { Fragment, useState } from "react"
import styles from "../styles/components/CustomForm.module.css"
import { toTitleCase } from "../utils/utils"

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
      <div>
        {sections.map((section, i) => {
          return (
            <fieldset className={styles.formSection} key={i}>
              <legend>{section.name}</legend>
              {section.fields.map((field, j) => {
                return (
                  <Fragment key={j}>
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
                  </Fragment>
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
