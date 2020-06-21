const Alexa = require('ask-sdk-core');
const ApiRequest = require('ApiRequest');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Diga o que você deseja?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const PriceByCurrencyIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PriceByCurrencyIntent';
    },
    async handle(handlerInput) {
        
        var currency = handlerInput.requestEnvelope.request.intent.slots.currency.value; // Busca o nome da moeda que foi solicitada 
        var initials = handlerInput.requestEnvelope.request.intent.slots.currency.resolutions.resolutionsPerAuthority[0].values; // Busca todas as siglas cadastradas 
        var initial = "";
        var value = "";
       
       // Percorre todas as siglas para encontrar a solicitada
        for(let i=0;i<initials.length;i++){
            let data = initials[i].value;
         
            if(data.name === currency){
                initial = data.id;
           
                break;
            }
           
        }
        
        // Verifica se foi encontrada alguma sigla
        if(initial.length > 0){
            
            let apiRequest = new ApiRequest();
            let frase = await apiRequest.makeRequest(`https://api.exchangeratesapi.io/latest?base=${initial}`); // Faz a requisição na API passando como parametro a sigla da moeda solicitada

            value = Number(frase.rates.BRL).toFixed(3); // Formata o valor para pegar três casas decimais
  
            //Verifica se o valor é menor que 1 centavo
            if(Number(frase.rates.BRL).toFixed(2).toString() === "0.00"){
                value = `O ${currency} está ${value} reais`; 
            }else{
                value = `O ${currency} está R$${value}`;     
            }
            
        }else{
            value = "Moeda não encontrada."
        }

        return handlerInput.responseBuilder
           .speak(value)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
 
    }
};

const PriceByCurrencyAndDateIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PriceByCurrencyAndDateIntent';
    },
    async handle(handlerInput) {
    
         var date = handlerInput.requestEnvelope.request.intent.slots.date.value; // Busca a data que foi solicitada 
         var currency = handlerInput.requestEnvelope.request.intent.slots.currency.value; // Busca o nome da moeda que foi solicitada 
         var initials = handlerInput.requestEnvelope.request.intent.slots.currency.resolutions.resolutionsPerAuthority[0].values; // Busca todas as siglas cadastradas 
         var initial = "";
         var value = "";
       
         // Percorre todas as siglas para encontrar a solicitada
         for(let i=0;i<initials.length;i++){
             let data = initials[i].value;
         
             if(data.name === currency){
                 initial = data.id;
           
                 break;
             }
           
         }
        
         // Verifica se foi encontrada alguma sigla
         if(initial.length > 0){
            
             let apiRequest = new ApiRequest();
             let result = await apiRequest.makeRequest(`https://api.exchangeratesapi.io/${date}?base=${initial}`); // Faz a requisição na API passando como parametro a sigla da moeda solicitada

            // Verifica se não deu algum erro
            if(result.hasOwnProperty("rates")){
   
             //Verifica se o valor é menor que 1 centavo
             if(Number(result.rates.BRL).toFixed(2).toString() === "0.00"){
                 value = `O ${currency} está ${Number(result.rates.BRL).toFixed(3)} reais no dia ${date}`; 
             }else{
                 value = `O ${currency} está R$${Number(result.rates.BRL).toFixed(2)} no dia ${date}`;     
             }
             
            }else{
                value = "Data inválida."
            }
            
         }else{
             value = "Moeda não encontrada."
         }

        console.log(value);

        return handlerInput.responseBuilder
           .speak(value)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
 
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Você pode dizer olá para mim! Como posso ajudar?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Vejo você em breve!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `Você acabou de acionar ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Desculpe, tive problemas para fazer o que você pediu. Por favor, tente novamente.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        PriceByCurrencyIntentHandler,
        PriceByCurrencyAndDateIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
