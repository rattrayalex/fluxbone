
# model_name can be model or collection
Mixin = (model_name, event_name="all", cb_name) ->

  eventCbName = "_eventCbs_#{ model_name }_#{ event_name }_#{ cb_name or '' }"

  mixin =

    componentDidMount: ->
      @props[model_name].on event_name,
        @[eventCbName]
        @

    componentWillUnmount: ->
      @props[model_name].off event_name,
        @[eventCbName]
        @

  mixin[eventCbName] = (args...) ->
    if cb_name? and @[cb_name]?
      @[cb_name](args...)
    else
      @forceUpdate()

  return mixin



module.exports = {
  Mixin

  # legacy
  ModelMixin: Mixin
  CollectionMixin: Mixin
}
