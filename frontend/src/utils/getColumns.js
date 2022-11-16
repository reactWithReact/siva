export const getColumns = (fields = []) => {
  return fields
    .filter((field) => field !== "_id")
    .map((field, index) => {
      const result = field.replace(/([A-Z])/, " $1");
      return {
        key: field,
        label: result.charAt(0).toUpperCase() + result.slice(1),
        index: index,
        hidden: false,
      };
    });
};
