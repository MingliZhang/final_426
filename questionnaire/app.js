let item_ids = await getItemIDs();
let item_views = [];
for (let i = 0; i < item_ids.length; i++){
    let item_info = getItemInfo(item_ids[i]);
    item_views[i] = createItemView(item_info);
    item_views[i].addEventListener('click', ()=>{
        this.toggleMetaInformation();
    });
}


getItemInfo(i){
    array1.find(id => id === i);
}