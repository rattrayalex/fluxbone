
module.exports =


  ModelMixin: (model_name, event_name="all", cb_name) ->

    eventCallbackName = "_eventCallbacks_#{ model_name }_#{ event_name }_#{ cb_name or '' }"

    mixin =

      componentDidMount: ->
        @props[model_name].on event_name,
          @[eventCallbackName]
          @

      componentWillUnmount: ->
        @props[model_name].off event_name,
          @[eventCallbackName]
          @

    mixin[eventCallbackName] = () ->
      if cb_name? and @[cb_name]?
        @[cb_name]()
      else
        @forceUpdate()

    return mixin


  CollectionMixin: (collection_name, event_name="all", cb_name) ->

    eventCallbackName = "_eventCallbacks_#{ collection_name }_#{ event_name }_#{ cb_name or '' }"

    mixin =

      componentDidMount: ->
        @props[collection_name].on event_name,
          @[eventCallbackName]
          @

      componentWillUnmount: ->
        @props[collection_name].off event_name,
          @[eventCallbackName]
          @

    mixin[eventCallbackName] = () ->
      if cb_name? and @[cb_name]?
        @[cb_name]()
      else
        @forceUpdate()

    return mixin
