import axios from 'axios';


/**
 * Returns a HTTP response object for both failed and successful requests
 * @param {string} url - The HTTP URL endpoint
 * @param {string} method - the HTTP verb e.g 'get'
 * @param {object} headers - the request headers
 * @param {object} params - object of request parameters
 * @param {object} data - the request body for data creation and updating HTTP verbs
 * @returns {object} responseObject - the response for the HTTP request
 * @returns {boolean} responseObject.error - used to indicate if the request was successful or not
 * @returns {object} responseObject.data - the data response for the HTTP request
 * @returns {number} responseObject.status - the HTTP status code for the request response. 
 */
export async function makeRequest(url, method, headers, params, data){
	try{
		let requestBody = {
            method: method,
            url: url,
			params: params,
			data: data,
			headers: headers
		}
		
		let response = await axios(requestBody);
		console.log("Successful request");
		return {error:false, data:response.data, status:response.status}
    } catch(exc){
		console.log("Failed request", JSON.stringify(exc.message));
		console.log(exc.response ? exc.response.data : {})
		return {data:exc.response.data, status:exc.response ? exc.response.status : 500}
    }
}

export function getQueryParams(){
	let queryString = window.location.href.split('?')[1];
	
	if(Boolean(queryString) == false){
		return {}
	}
	let queryParts = queryString.split('&');

	let queryParams = {};

	for(let i = 0; i < queryParts.length; i++){
		let keyValuePair = queryParts[i].split('=');
		queryParams[keyValuePair[0]] = keyValuePair[1]
	}

	return queryParams;
}


export function getUser(){
	let user = window.localStorage.getItem('user');
	
	return user;
}
