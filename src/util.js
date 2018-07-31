export const mapOptions = ( el, defaultOptions ) => {
    const dataOptions = Object.keys( defaultOptions ).reduce( ( dataOptions, optionName ) => {
        const attr = `data-${camelCaseToDash( optionName )}`
        const value = el.getAttribute( attr )
        if ( value ) {
            dataOptions[ optionName ] = value
        }
        return dataOptions
    }, {} )
    return Object.assign( defaultOptions, dataOptions )
}

export const camelCaseToDash = s => s.replace( /([a-zA-Z])(?=[A-Z])/g, '$1-' ).toLowerCase()

export const formSettings = ( el, defaultOptions, options ) => {
    return Object.assign( 
        mapOptions( el, defaultOptions ), 
        options 
    )
}