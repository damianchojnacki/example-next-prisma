export default class HttpException extends Error
{
    public data: {[key: string]: any};

    constructor(public status: number, public message: string, data?: {[key: string]: any})
    {
        super();

        this.data = data ?? {}
    }
}