import tooltip from './tooltip'
import loading from './loading'
import toast from './toast'

export default {
	install: function(Vue) {
		tooltip.install(Vue);
		loading.install(Vue);
		toast.install(Vue);
	}
}