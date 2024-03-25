import { ref, reactive } from 'vue';
const userLoginSql = reactive([
    {
        account: '13066666666',
        password: '123456'
    }
]);
const SQLTest = () => {
    return {
        userLoginSql
    };
};

export default SQLTest;
