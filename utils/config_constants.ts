
export function setbaseURL(env:string)
{
    switch (env){
        case 'SAUCEDEMO':
            return process.env.SAUCEDEMO_URL;
        case 'RAHUL':
            return process.env.RAHUL_URL;
        default:
            throw new Error(`Invalid Environment: ${env}`)
    }
}