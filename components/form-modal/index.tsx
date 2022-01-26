import React from 'react';
import { Modal, ModalProps } from 'antd';
import Form from '../form';
import type { FormProps } from '../form';
import { useLocale } from '../_util/hooks';

export interface FormModalProps extends ModalProps {
  isEditing?: boolean;
  exactTitle?: boolean;
  formProps: FormProps;
}

const FormModal = (props: FormModalProps) => {
  const { formProps, isEditing, title, ...rest } = props;

  const displayTitle = props.exactTitle ? title : `${isEditing ? '编辑' : '新建'} ${title}`;

  const locale = useLocale();
  console.log('🚀 ~ file: index.tsx ~ line 19 ~ FormModal ~ locale', locale);

  return (
    <Modal title={displayTitle} {...rest}>
      <Form {...formProps} />
    </Modal>
  );
};

export default FormModal;