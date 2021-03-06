import List from './List'

export default {
  name: 'ZJYList',

  render(h) {
    return (
      <List data={this.data} status={this.status} message={this.message}></List>
    )
  },

  props: {
    data: Array,
    status: Number,
    message: String
  },

  components: {
    List
  }
}