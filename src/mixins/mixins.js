export default {
  methods: {
    uppercase(value = "") {
      console.log("mixin", value);
      return value.toUpperCase();
    },
  },
};
