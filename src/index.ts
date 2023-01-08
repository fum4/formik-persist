import { type FormikValues, useFormikContext } from 'formik';
import usePersist, { PersistOptions } from '@nw/use-persist';

export interface FormikPersistProps extends Pick<
  PersistOptions,
  'key' | 'setToStorage' | 'getFromStorage' | 'include' | 'exclude' | 'encode' | 'decode'
>{
  session?: boolean;
}

const FormikPersist = ({
  key = 'formikPersist',
  session = false,
  setToStorage,
  getFromStorage,
  include,
  exclude,
  encode,
  decode,
}: FormikPersistProps) => {
  const { values, setValues } = useFormikContext<FormikValues>();
  const storage = session ? sessionStorage : localStorage;

  usePersist({
    key,
    values,
    setValues,
    setToStorage: setToStorage || storage.setItem,
    getFromStorage: getFromStorage || storage.getItem,
    include,
    exclude,
    encode,
    decode,
  })

  return null;
};

export default FormikPersist;
