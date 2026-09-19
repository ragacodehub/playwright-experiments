import {test as base,request} from "@playwright/test"
import { ApiHelper } from "../../utils/booking.helper";
import userData from "../../data/api/users.json"

type ApiFixture = {
    token: string,
    apiHelper: ApiHelper
}

export const test = base.extend<ApiFixture>({
    apiHelper: async({},use)=>{
        const apiContext = await request.newContext();
        const apiHelper = new ApiHelper(apiContext);
        await use(apiHelper);
        await apiContext.dispose();
    },
    token: async({apiHelper},use)=>{
        const response = await apiHelper.post("auth",{data:userData});
        const responseBody = await response.json();
        await use(responseBody.token);
    } 
}) 

