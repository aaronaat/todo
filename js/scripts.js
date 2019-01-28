function Item(description) {
  this.description = description,
  this.status = false
}

function ToDoList() {
  this.items = [],
  this.currentId = 0
}

ToDoList.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

ToDoList.prototype.addItem = function(item) {
  item.id = this.assignId();
  this.items.push(item);
}

ToDoList.prototype.deleteItem = function(id) {
  for (var i = 0; i < this.items.length; i++) {
    if (this.items[i]){
      if (this.items[i].id == id){
        delete this.items[i];
        return true;
      }
    }
  };
  return false;
}

ToDoList.prototype.findItem = function(id) {
  for (var i = 0; i < this.items.length; i++) {
    if (this.items[i]){
      if (this.items[i].id == id){
        return this.items[i];
      }
    }
  };
  return false;
}

ToDoList.prototype.updateItem = function(id, description) {
  for (var i = 0; i < this.items.length; i++) {
    if (this.items[i]){
      if (this.items[i].id == id){
        this.items[i].description = description;
        return true;
      }
    }
  };
  return false;
}

ToDoList.prototype.changeStatusItem = function(id) {
  for (var i = 0; i < this.items.length; i++) {
    if (this.items[i]){
      if (this.items[i].id == id){
        this.items[i].status = !this.items[i].status;
        return true;
      }
    }
  };
  return false;
}

$(document).ready(function(){
  var listToDo = new ToDoList;

  var addListItem = function(list, item) {
    $("#" + list).append("<input type='checkbox' name='" + list + "' value=" + item.id.toString() + "><span>" + item.description + "</span>");
  };

  var removeListItems = function(list) {
    $("input:checkbox[name=" + list + "]:checked").each(function() {
      var id = parseInt($(this).val());
      listToDo.deleteItem(id);
      console.log(listToDo);
      alert(1);
      $(this).next().remove();
      $(this).remove();
    });

  };

  $("#form").submit(function(event){
    var inputItem = $("#item").val();
    var oneItem = new Item(inputItem);

    listToDo.addItem(oneItem);
    addListItem("todo", oneItem);

    event.preventDefault();
  });

  $("#delete").click(function(){
    removeListItems("todo");
    removeListItems("done");
  });
});
