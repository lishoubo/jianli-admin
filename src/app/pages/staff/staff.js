/**
 * Created by lishoubo on 16/5/21.
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
        el: '#jl-staff-container',
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
        el: '#add-staff-modal',
        methods: {
            add_staff: function () {
                var data = $('#add-staff-form').serializeFormJSON();
                this._post("/api/admin/staffs",
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