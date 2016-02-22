const ValueMixin = {
  setValue(field, e) {
    let v = e;
    const target = e && e.target;
    if (target) {
      if ((`${target.nodeName}`).toLowerCase() === 'input' &&
        target.type === 'checkbox') {
        v = target.checked;
      } else {
        v = e.target.value;
      }
    }
    const newFormData = {};
    newFormData[field] = v;
    this.setState({
      formData: {
        ...this.state.formData,
        ...newFormData,
      },
    });
  },
};

export default ValueMixin;
