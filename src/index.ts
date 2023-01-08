import { useRef, useLayoutEffect } from 'react';
import { type FormikValues, useFormikContext } from 'formik';
import usePersist, { PersistOptions } from '@nw/use-persist';

export interface FormikPersistProps extends Pick<
  PersistOptions,
  'key' | 'setToStorage' | 'getFromStorage' | 'encode' | 'decode'
>{
  session?: boolean;
}

const FormikPersist = ({
  key = 'formikPersist',
  session = false,
  setToStorage,
  getFromStorage,
  encode,
  decode
}: FormikPersistProps) => {
  const { values, setValues } = useFormikContext<FormikValues>();
  const setValuesRef = useRef(setValues);
  const storage = session ? sessionStorage : localStorage;

  useLayoutEffect(() => {
    setValuesRef.current = setValues;
  });

  usePersist({
    key,
    values,
    setValues: setValuesRef.current,
    setToStorage: setToStorage || storage.setItem,
    getFromStorage: getFromStorage || storage.getItem,
    encode,
    decode,
  })

  return null;
};

export default FormikPersist;
