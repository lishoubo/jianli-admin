/**
 * Created by lishoubo on 16/6/7.
 */

$(function () {
    var result = {
        data: {
            page: 0,
            pageSize: 10,
            items: []
        }
    };

    new Vue({
        el: '#jl-building-container',
        data: result,
        created: function () {
            this.go_to_page(1);
        },
        methods: {
            go_to_page: function (page) {
                if (!page) {
                    page = 1;
                }
                if (page < 1 || (!!result.data.pageTotal && page >= result.data.pageTotal)) {
                    return
                }
                this._get("/api/admin/staffs",
                    {'page': page, 'pageSize': 10},
                    function (response) {
                        result.data = response.data;
                    }, function (error) {
                        console.log(error);
                    })
            }

        }
    });
    new Vue({
        el: '#add-building-modal',
        methods: {
            add_building: function () {
                var data = $('#add-building-form').serializeFormJSON();
                this._post("/api/admin/building",
                    data,
                    function (response) {
                        if (response.success) {
                            window.location.reload();
                        } else {
                            bootbox.alert({
                                    title: "添加失败",
                                    message: response.message,
                                    closable: true
                                }
                            );
                        }
                    }, function (error) {
                        console.log(error)
                    }
                )

            }
        }
    });
});

