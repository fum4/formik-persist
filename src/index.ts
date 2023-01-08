import { useRef, useEffect, useLayoutEffect } from 'react';
import { type FormikValues, useFormikContext } from 'formik';

export interface FormikPersistProps {
  initialValues: FormikValues;
  session?: boolean;
}

const FormikPersist = ({ initialValues, session = false }: FormikPersistProps) => {
  const { values, setValues } = useFormikContext<FormikValues>();
  const setValuesRef = useRef(setValues);
  const storage = session ? sessionStorage : localStorage;

  useLayoutEffect(() => {
    setValuesRef.current = setValues;
  });

  useEffect(() => {
    const persisted = storage.getItem('formikPersist');

    if (persisted) {
      const persistedValues = JSON.parse(persisted);

      if (persistedValues) {
        setValuesRef.current?.(persistedValues);
      }
    }
  }, [ storage ]);

  useEffect(() => {
    if (values !== initialValues) {
      storage.setItem('formikPersist', JSON.stringify(values));
    }
  }, [ values, initialValues, storage ]);

  return null;
};

export default FormikPersist;
