export const getMessages = async( token: string ) => {
    // const url = 'https://powerful-tor-71495.herokuapp.com/api/messages'
    const url = 'http://192.168.1.108:4055/api/messages'
    
    const req = await fetch( url, {
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            }
    })

    const res = await req.json();
    return res;
};
