
export const fetchAPI = async (endpoint: string, data: any = {}, method = 'GET', token = '') => {
    
    const url = 'http://192.168.1.108:4055/api/' + endpoint;
    
    // const url = 'https://powerful-tor-71495.herokuapp.com/api/' + endpoint;
    
    if (method === 'GET') {
        const req = await fetch(url, {
            headers: {
                'x-token': token,
            }
        });
        return await req.json();

    } else {
        const req = await fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token,
            },
            body: data ? JSON.stringify( data ) : null
        })

        return await req.json();
    }
}