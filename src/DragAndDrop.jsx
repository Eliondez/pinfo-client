import React, { Component } from 'react';
import {Icon} from 'antd';
class DragAndDrop extends Component {
  dropRef = React.createRef()

  state = {
    dragging: false
  }

  handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }
  handleDragIn = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.dragCounter++
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({dragging: true})
    }
  }
  handleDragOut = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.dragCounter--
    if (this.dragCounter > 0) return
    this.setState({dragging: false})
  }
  handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({dragging: false})
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.props.handleDrop(e.dataTransfer.files)
      e.dataTransfer.clearData()
      this.dragCounter = 0
    }
  }

  componentDidMount() {
    this.dragCounter = 0
    let div = this.dropRef.current
    div.addEventListener('dragenter', this.handleDragIn)
    div.addEventListener('dragleave', this.handleDragOut)
    div.addEventListener('dragover', this.handleDrag)
    div.addEventListener('drop', this.handleDrop)
  }
  componentWillUnmount() {
    let div = this.dropRef.current
    div.removeEventListener('dragenter', this.handleDragIn)
    div.removeEventListener('dragleave', this.handleDragOut)
    div.removeEventListener('dragover', this.handleDrag)
    div.removeEventListener('drop', this.handleDrop)
  }
  render() {
    return (
      <div
        style={{display: 'inline-block', position: 'relative', width: "100%"}}
        ref={this.dropRef}
      >
        {this.state.dragging &&
          <div 
            style={{
              border: 'dashed grey 3px',
              borderRadius: '5px',
              backgroundColor: 'rgba(255,255,255,.8)',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0, 
              right: 0,
              zIndex: 9999
            }}
          >
            <div 
              style={{
                position: 'absolute',
                top: '30%',
                right: 0,
                left: 0,
                textAlign: 'center',
                color: 'grey',
                fontSize: 56                
              }}
            >
              <Icon style={{padding: "10px", border: "2px solid grey",
                borderRadius: "50%"}} type="import" />
            </div>
          </div>
        }
        {this.props.children}
      </div>
    )
  }
}
export default DragAndDrop