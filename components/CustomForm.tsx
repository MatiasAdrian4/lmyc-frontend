import { Fragment, useState } from "react"
import styles from "../styles/components/CustomForm.module.css"

interface FormField {
  name: string
  displayName: string
  width: string
}
export interface FormSection {
  title: string
  fields: FormField[]
}

interface CustomFormProps {
  data: any
  dataId: any
  sections: FormSection[]
  submitFunction: Function
}

const CustomForm: React.FC<CustomFormProps> = ({
  data,
  dataId,
  sections,
  submitFunction
}: CustomFormProps) => {
  const [model, setModel] = useState(data)
  const [updating, setUpdating] = useState(false)
  const [errors, setErrors] = useState({})

  const saveChanges = async () => {
    try {
      await submitFunction(dataId, model)
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
                    <input
                      id={field.name}
                      type="text"
                      value={model[field.name]}
                      onChange={(e) => {
                        setModel({ ...model, [field.name]: e.target.value })
                        setUpdating(true)
                      }}
                      className={errors[field.name] ? styles.error : ""}
                      style={{ width: field.width }}
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

export default CustomForm
