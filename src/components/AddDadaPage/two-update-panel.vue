<template>

  <div>
    <el-tabs v-model="activeName" @tab-click="handleTabsClick">
      <el-tab-pane :label="$ml.get('word.table')" name="0">
        <div class="row" style="padding-top: 3vh">
          <div class="title-bord col-md-2">
            <h4> {{ nameTitle }}</h4>
          </div>
          <div class=" col-md-2 fix-position ">
            <el-dropdown @command="changePageSize" style="width: 100%;">
              <el-button size="medium" type="warning" style="width: 100%; font-size: 16px">
                {{ $ml.get('word.numRowOnPage') }}{{ pageSetting.pageSize }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="15"> 15 {{ $ml.get('word.rows') }}</el-dropdown-item>
                <el-dropdown-item command="30"> 30{{ $ml.get('word.rows') }}</el-dropdown-item>
                <el-dropdown-item command="50"> 50{{ $ml.get('word.rows') }}</el-dropdown-item>
                <el-dropdown-item command="75"> 75{{ $ml.get('word.rows') }}</el-dropdown-item>
                <el-dropdown-item command="100"> 100{{ $ml.get('word.rows') }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="col-md-2">
            <el-button plain type="info" style="width: 100%; font-size: 16px" v-on:click="onexport">
              {{ $ml.get('word.exportFile') }}
            </el-button>
          </div>
          <div class="col-md-2">
            <el-dropdown style="width: 100%" :hide-on-click="false">
              <el-button type="primary" style="width: 100%; font-size: 16px">
                {{ $ml.get('word.column') }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu style="width: 11vw;" slot="dropdown">
                <el-checkbox-group :min="1"
                                   v-model="checkedColumns" @change="handleCheckedColumnChange">
                  <el-checkbox v-for="column in columns" style="padding-left: 2vw" :label="column"
                               :key="column">{{ column }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="input-group col-md-4">
            <el-input :placeholder="$ml.get('word.search')"  v-model="pageSetting.data"
                      v-on:change="onChange"
                     class="input-with-select" clearable>
              <el-button slot="prepend" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </div>
        <el-table
            v-loading="LOAD_ADDITIONAL_DATA"
            id="lol"
            stripe
            max-height="560"
            :empty-text="$ml.get('word.empty')"
            ref="paramTable"
            :data="dataList.data.filter(elem=>{return elem.data!=='не задано'})"
            @row-dblclick="link"
            style="width: 100%"
        >
          <el-table-column
              v-for="clmn in tableColumns"
              v-bind:key="clmn"
              label-class-name="header-st"
              resizable align="left"
              sortable
              :prop="clmn.key"
              :label="clmn.label"
          >
          </el-table-column>
          <el-table-column
              header-align="right"
              label-class-name="header-st"
              resizable align="right"
              :label="this.$ml.get('word.deleteR')"
          >
            <template slot-scope="scope">
              <el-popconfirm
                  :confirmButtonText='confirmOk'
                  :cancelButtonText='confirmNo'
                  icon="el-icon-info"
                  cancelButtonType="danger"
                  iconColor="red"
                  @onConfirm="deleteObj(scope.$index, scope.row,$event)"
                  :title="confirmText"
              >
                <el-button
                    slot="reference"
                    :loading="deleteLoadId===scope.row.id"
                    icon="el-icon-delete-solid"
                    size="mini"
                    type="danger"
                    @click="setConfirmText"
                    style="font-size: 20px"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>

        </el-table>

        <!--
                    <b-table class="my-table-scroll" no-border-collapse hover sticky-header="650px"
                 :items="listForSearch.filter(elem=>{return elem.data!=='не задано'})"
                 @row-dblclicked="(item) => link( item)"
                 :fields="tableColumns">
            <template v-slot:cell(index)="data">
                {{ data.index + 1 }}
            </template>
        </b-table>
        <table class="table table-hover  "
                style="text-align: center; z-index: 0; border-radius: 0px">
             <thead>
             <tr>
                 <th scope="col">id</th>
                 <th scope="col">{{$ml.get('word.name')}}</th>
                 <th scope="col">{{$ml.get('word.shortName')}}</th>
                 <th scope="col" v-text="$ml.get('word.status')"></th>
             </tr>
             </thead>
             <tbody>
             <tr v-for="current in listForSearch" v-bind:key="current" v-show="current.data!==''">
                 <td>{{current.id}}
                 </td>
                 <td>{{current.data}}
                 </td>
                 <td>{{current.secondary_data}}
                 </td>
                 <td>{{current.status}}
                 </td>

             </tr>
             </tbody>
         </table>-->
        <div class="pagin-content">
        <el-pagination
            class="pagin-st"
            @current-change="handleCurrentPage"
            background
            :current-page.sync="pageSetting.initRecordFrom"
            layout="prev, pager, next"
            :total="dataList.countResults*10">
        </el-pagination>
      </div>
      </el-tab-pane>

      <el-tab-pane :label="$ml.get('word.save')" name="1">
        <br/>
        <div class="title-bord col-md-2">
          <h4> {{ nameTitle }}</h4>
        </div>
        <hr/>
        <div class=" row ">
          <input-field
              class="col-md-4"
              :name-input="nameTitle"
              :save-parameters="saveDataObj"
              index="saveData_primary"
          />
          <input-field
              class="col-md-4"
              :name-input="$ml.get('word.shortName')"
              :save-parameters="saveDataObj"
              index="saveData_secondary"
          />
          <vue-datalist
              class="col-md-4"
              :title-input="$ml.get('word.status')"
              :items="PARAM_NAME_AND_UNITS.status"
              :update-obj="saveDataObj"
              index="status"
              :clean-search="cleanInputList"
              :holderNum="updateDataObj.objToBeChanged"

          />

        </div>
        <hr/>
        <div class="row">
          <div class="col-md-3"></div>
          <div class="  col-md-3">
            <el-button type="danger" @click="cancelSave()" plain style="width: 100%">
              <span>{{ $ml.get('word.cancel') }}</span>
            </el-button>
          </div>
          <div class="col-md-3">
            <el-button :loading="loadStatus"
                       @click="save(1)" plain
                       style="width: 100%"
                       type="success"><span>{{ $ml.get('word.save') }}</span>
            </el-button>
          </div>
        </div>
        <div class="col-md-3"></div>
      </el-tab-pane>
      <el-tab-pane :label="$ml.get('word.update')" name="2">
        <br/>
        <div class="title-bord col-md-2">
          <h4> {{ nameTitle }}</h4>
        </div>
        <hr/>
        <div class=" row ">
          <vue-datalist
              class="col-md-3"
              :title-input="$ml.get('word.dataChange')"
              :items="dataList.data"
              :update-obj="updateDataObj"
              index="objToBeChanged"
              :clean-search="cleanInputList"
              :holderNum="updateDataObj.objToBeChanged!==0?dataList.data.find(elem=>elem.id===updateDataObj.objToBeChanged).id:0"
              @change-meth="changeUpdateValue"

          />
          <input-field
              class="col-md-3"
              :name-input="nameTitle"
              :save-parameters="updateDataObj"
              index="saveData_primary"
          />
          <input-field
              class="col-md-3"
              :name-input="$ml.get('word.shortName')"
              :save-parameters="updateDataObj"
              index="saveData_secondary"
          />
          <vue-datalist
              class="col-md-3"
              :title-input="$ml.get('word.status')"
              :items="PARAM_NAME_AND_UNITS.status"
              :update-obj="updateDataObj"
              :clean-search="cleanInputList"
              index="status"
              :holderNum="updateDataObj.status"

          />
        </div>
        <hr style="position: center; width: 70%"/>
        <div class="savePageRow row ">
          <div class="col-md-3"></div>
          <div class="  col-md-3">
            <el-button type="danger" @click="cancel()" plain style="width: 100%">
              <span>{{ $ml.get('word.cancel') }}</span>
            </el-button>
          </div>
          <div class="col-md-3">
            <el-button :loading="loadStatus && LOAD_ADDITIONAL_DATA"
                       @click="update(1)" plain
                       style="width: 100%"
                       type="success"><span>{{ $ml.get('word.update') }}</span>
            </el-button>
          </div>
          <div class="col-md-3"></div>

        </div>
        <hr/>
      </el-tab-pane>
      <el-tab-pane :label="$ml.get('word.importFile')" name="3">
        <div class="upload-box">
          <div class="row import-page-btn">
            <div class="col-md-2 title-bord">
              <h4> {{ nameTitle }}</h4>
            </div>
            <div class="col-md-1"></div>
            <div class="col-md-4">
              <el-upload
                  :file-list="listFile"
                  :show-file-list="false"
                  class="upload-demo"
                  :on-change="handleChange"
                  :on-remove="handleRemove"
                  :on-exceed="handleExceed"
                  :limit="limitUpload"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                  :auto-upload="false">
                <el-button type="warning" style="width: 20vw;" plain>
                  <strong>{{ $ml.get('word.clickToUpload') }}</strong>
                </el-button>
              </el-upload>
            </div>
            <div class="col-md-2">
              <button class="btn  btn-block   btn-secondary" :class="{disabled:(da===null)}" type="button"
                      @click="importFile"
              >
                         <span>{{ $ml.get('word.importFile') }}
                        </span>
              </button>
            </div>
            <div class="col-md-2 ">
              <button class="btn  btn-block  btn-danger" :class="{disabled:(da===null)}" type="button"
                      @click="cancelInport"
              >
                         <span>{{ $ml.get('word.cancel') }}
                        </span>
              </button>
            </div>
            <div class="col-md-1"></div>
          </div>
        </div>
        <hr/>
        <el-table
            :empty-text="$ml.get('word.empty')"
            height="600" :data="da"
            :row-class-name="tableRowClassName">
          <el-table-column prop="id" label="№">
          </el-table-column>
          <el-table-column prop="data" :label="$ml.get('word.fullName')">
          </el-table-column>
          <el-table-column prop="secondary_data" :label="$ml.get('word.shortName')">
          </el-table-column>
          <el-table-column prop="status" :label="$ml.get('word.status')">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!-- <ul class="nav nav-tabs" id="myTabengine" role="tablist">
      <li class="nav-item">
          <a class="nav-link active" id="home-tabengine" data-toggle="tab" :href="'#h'+nameTitle"
             v-on:click="cancelSave" @click="cancel"
             role="tab" aria-controls="home" aria-selected="true">{{$ml.get('word.table')}}</a>
      </li>
      <li class="nav-item">
          <a class="nav-link" id="profile-tabengine" data-toggle="tab" :href="'#p'+nameTitle"
             @click="cancel"

             role="tab" aria-controls="profile" aria-selected="false">{{$ml.get('word.save')}}</a>
      </li>
      <li class="nav-item">
          <a class="nav-link" id="contact-tabengine" ref="updateTab" data-toggle="tab" :href="'#c'+nameTitle"
             role="tab" aria-controls="contact" aria-selected="false">{{$ml.get('word.update')}}</a>
      </li>

      <li class="nav-item">
          <a class="nav-link" id="importTab" ref="importTab" data-toggle="tab"
             :href="'#in'+nameTitle" v-on:click="cancelSave" @click="cancel"
             role="tab" aria-controls="imprt" aria-selected="false">{{$ml.get('word.importFile')}}</a>
      </li>
  </ul>-->

  </div>

</template>

<script>
import VueDatalist from "../input/vue-datalist";
import {mapActions, mapGetters} from "vuex";
import InputField from "../input/input-field";
import XLSX from "xlsx";

export default {
  name: "two-update-panel",
  // eslint-disable-next-line vue/no-unused-components
  components: {InputField, VueDatalist},
  data: () => ({
    tablePage: true,
    savePage: false,
    updatePage: false,
    importPage: false,
    showErr: null,
    deleteLoadId: -1,
    listForSearch: [],
    saveDataObj: {
      saveData_primary: null,
      saveData_secondary: null,
      status: null
    },
    updateDataObj: {
      objToBeChanged: 0,
      saveData_primary: null,
      saveData_secondary: null,
      status: null
    },
    activeName: '0',
    search: '',
    showDismissibleAlert: false,
    columnOptions: [],
    columns: [],
    cleanInputList: false,
    limitUpload: 100,
    confirmText: '',
    confirmOk: '',
    confirmNo: '',
    fileTemp: null,
    file: null,
    listFile: null,
    da: null,
    dalen: 0,
    test: null,
    testlist: [],
    checkedColumns: [],
    isIndeterminate: true,
    checkAll: false,
    tableColumns: [],
    pageSetting: {
      initRecordFrom: 1,
      pageSize: 50,
      data:null
    },
    allTableColumns: []
  }),

  props: {
    nameTitle: String,
    listParamTwo: null,
    listParamOnSave: Boolean,
    namePanel: String,
    dataList: null,
    loadStatus: null,
    title_one: String,
    title_two: String,

  },
  computed: {
    ...mapGetters([
      'PARAM_NAME_AND_UNITS',
      'LOAD_ADDITIONAL_DATA'

    ])
  },
  methods: {
    ...mapActions([
      'GET_ALL_ADDITIONAL_DATA',
      'GET_PARAM_NAME'
    ]),
    // eslint-disable-next-line no-unused-vars
    tableRowClassName({row, rowIndex}) {
      let temp = this.dataList.data.find(item =>
          item.data === row.data
      );
      if (temp !== undefined) {
        return 'warning-row';
      } else {
        return 'success-row';
      }
    },
    changePageSize(value) {
      this.pageSetting.pageSize = value
      this.pageSetting.initRecordFrom = 1
      this.$emit("load-data", this.pageSetting)
    },
    onexport() { // On Click Excel download button

      // export json to Worksheet of Excel
      // only array possible
      let arr = []
      this.dataList.data.map(elem => {
        let obj = {}
        if (elem.data !== "не задано") {
          obj['№'] = elem.id
          obj[this.$ml.get('word.fullName')] = elem.data
          obj[this.$ml.get('word.shortName')] = elem.secondary_data
          obj[this.$ml.get('word.status')] = elem.status
          arr.push(obj)
        }
      });
      var animalWS = XLSX.utils.json_to_sheet(arr)

      // A workbook is the name given to an Excel file
      var wb = XLSX.utils.book_new() // make Workbook of Excel

      // add Worksheet to Workbook
      // Workbook contains one or more worksheets
      XLSX.utils.book_append_sheet(wb, animalWS, 'animals') // sheetAName is name of Worksheet

      // export Excel file
      XLSX.writeFile(wb, this.nameTitle + '.xlsx') // name of the file is 'book.xlsx'
    },
    cancelInport() {
      this.listFile = null
      this.fileTemp = null
      this.da = null
      this.file = null
    },
    // eslint-disable-next-line no-unused-vars
    handleChange(file, fileList) {
      this.fileTemp = file.raw;
      if (this.fileTemp) {
        if ((this.fileTemp.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            || (this.fileTemp.type == 'application/vnd.ms-excel')) {
          this.importfxx(this.fileTemp);
        } else {
          this.$message({

            showClose: true,
            type: 'warning',
            message: 'ошибка！'
          })
        }
      } else {
        this.$message({

          showClose: true,
          type: 'warning',
          message: 'ошибка'
        })
      }
    },
    handleExceed() {
      this.$message({

        showClose: true,
        type: 'warning',
        message: 'ошибка！'
      })
      return;
    },
    // eslint-disable-next-line no-unused-vars
    handleRemove(file, fileList) {
      this.fileTemp = null
      this.da = null
    },
    async importFile() {
      let importList = [];
      await this.da.forEach(v => {
            let temp = this.dataList.data.find(item =>
                item.data === v.data
            );
            if (temp === undefined) {
              let obj = {}
              obj.saveData_primary = v['data']
              obj.saveData_secondary = v['secondary_data']
              obj.status = this.PARAM_NAME_AND_UNITS.status.find(item => item.data === v.status).id
              this.dataList.data.push(v)
              importList.push(obj)
            }
          }
      )

      await this.$emit("import-data-api", {list: importList});
      this.GET_ALL_ADDITIONAL_DATA();
      this.$message({
        showClose: true,
        message: this.$ml.get('word.dataAddSuccess'),
        type: 'success'
      });
    },
    // eslint-disable-next-line no-unused-vars
    handleTabsClick(tab) {
      this.cancel()
      this.cancelSave()
    },
    // eslint-disable-next-line no-unused-vars
    importfxx(obj) {
      let _this = this;
      // eslint-disable-next-line no-unused-vars
      let inputDOM = this.$refs.inputer;

      this.file = event.currentTarget.files[0];

      var rABS = false;
      var f = this.file;

      var reader = new FileReader();
      //if (!FileReader.prototype.readAsBinaryString) {
      FileReader.prototype.readAsBinaryString = function (f) {
        var binary = "";
        var rABS = false;
        // eslint-disable-next-line no-unused-vars
        var pt = this;
        var wb;
        var outdata;
        var reader = new FileReader();
        // eslint-disable-next-line no-unused-vars
        reader.onload = function (e) {
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          var XLSX = require("xlsx");
          if (rABS) {
            // eslint-disable-next-line no-undef
            wb = XLSX.read(btoa(fixdata(binary)), {
              type: "base64"
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary"
            });
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
          console.log(outdata);
          let arr = [];
          outdata.map(v => {
            let obj = {}
            obj.id = v['№']
            obj.data = v[_this.$ml.get('word.fullName')]
            obj.secondary_data = v[_this.$ml.get('word.shortName')]
            obj.status = v[_this.$ml.get('word.status')]
            arr.push(obj)
          });
          _this.da = arr;
          _this.dalen = arr.length;
          return arr;
        };
        reader.readAsArrayBuffer(f);
      };
      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
    async deleteObj(index, row) {
      this.deleteLoadId = row.id
      this.$emit("delete-data-api", row.id)
      console.log(index, row);

    },
    handleCheckedColumnChange(value) {
      let checkedCount = value.length;
      this.tableColumns = []
      value.forEach(elem => {
            this.tableColumns.push(this.allTableColumns.find(item => item.label === elem))
          }
      )
      this.checkAll = checkedCount === this.columns.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.columns.length;
    },
    async clear() {
      this.search = '';
      this.filterResults();
    },
    changeUpdateValue(number) {
      this.tempUpdateObj = this.updateDataObj;
      console.log(number)
    },
    handleCurrentPage(val) {
      this.pageSetting.initRecordFrom = val
      this.$emit("load-data", this.pageSetting)
    },
    onChange() {
      this.$emit("load-data", this.pageSetting)
      // this.filterResults();
    },
    filterResults() {
      // first uncapitalize all the things
      this.listForSearch = this.dataList.data.filter((item) => {
        return (item.data.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
      });
    },
    setDataList(tempList) {
      this.dataList.data = tempList;
    },
    async link(record) {
      this.activeName = '2'
      this.updateDataObj.objToBeChanged = record.id;
      this.updateDataObj.saveData_primary = record.data;
      this.updateDataObj.saveData_secondary = record.secondary_data;
      console.log(1)
    },
    async save(number) {

      let temp = this.dataList.data.find(item =>
          item.data === this.saveDataObj.saveData_primary
      );

      if (temp === undefined) {
        this.$message({
          showClose: true,
          message: this.$ml.get('word.dataAddSuccess'),
          type: 'success'
        });
        if (this.saveDataObj.saveData_primary != null) {
          if (this.saveDataObj.status === null) {
            this.saveDataObj.status = 1;
          }

          await this.$emit("save-data-api", this.saveDataObj);
          this.cancel()

          let promise = new Promise((resolve) => {
            setTimeout(() => resolve("готово!"), 1500)
          });
          await promise
          this.GET_ALL_ADDITIONAL_DATA();

          this.GET_PARAM_NAME();
          this.cancel()

        }
      } else {
        this.$message({
          showClose: true,
          message: this.$ml.get('msg.duplicateValue'),
          type: 'error'
        });
        this.cancel()
      }

      console.log(number)
    },
    cancel() {
      this.cleanInputList = !this.cleanInputList;
      this.updateDataObj.objToBeChanged = 0;
      this.updateDataObj.saveData_primary = null;
      this.updateDataObj.status = 1;
      this.tempUpdateObj.objToBeChanged = 0
      this.updateDataObj.saveData_secondary = null;
    },
    setConfirmText() {
      this.confirmText = this.$ml.get('msg.deleteConfirm')
      this.confirmOk = this.$ml.get('word.confirm')
      this.confirmNo = this.$ml.get('word.cancel')
    },
    cancelSave() {
      this.cleanInputList = !this.cleanInputList;
      this.saveDataObj.saveData_primary = null;
      this.saveDataObj.status = 1;
      this.saveDataObj.saveData_secondary = null;
    },
    handleDeleteRow(index, row) {
      console.log(index, row);
    },
    async update(number) {
      if (this.updateDataObj.objToBeChanged != null) {
        if (this.dataList.data.find(item =>
            item.data === this.updateDataObj.saveData_primary &&
            item.status === this.updateDataObj.status) !== undefined) {
          this.$message({
            showClose: true,
            message: this.$ml.get('msg.duplicateValue'),
            type: 'error'
          });
        } else {
          if (this.updateDataObj.status === null) {
            this.updateDataObj.status = 1;
          }

          await this.$emit("update-data-api", this.updateDataObj);
          this.$message({
            showClose: true,
            message: this.$ml.get('word.dataAddSuccess'),
            type: 'success'
          });
          let temp = this.dataList.data.find(item => item.id === this.updateDataObj.objToBeChanged);
          temp.status = this.PARAM_NAME_AND_UNITS.status.find(item => item.id === this.updateDataObj.status).data;
          temp.data = this.updateDataObj.saveData_primary;
          temp.secondary_data = this.updateDataObj.saveData_secondary;
          this.listForSearch = this.dataList.data;
          this.cancel()
        }
      }
      console.log(number)
    }
  },
  watch: {
    dataList: function (val) {
      if (val !== null || val !== undefined)
        this.listForSearch = this.dataList.data;
    },
    DELETE_RESPONSE: function (val) {
      if (this.deleteLoadId !== -1) {
        if (val.resp) {
          this.$message({
            showClose: true,
            message: this.$ml.get('msg.deleteSuccess'),
            type: 'success'
          });
          this.listForSearch
              .splice(this.listForSearch.findIndex(item => item.id === val.id), 1)
        } else {
          this.$message({
            showClose: true,
            message: this.$ml.get('errPage.deleteErr'),
            type: 'error'
          });
        }
        this.deleteLoadId = -1
      }
    }

  },
  mounted() {
    this.$emit("load-data", this.pageSetting)
    this.checkedColumns = ['№', this.$ml.get('word.fullName'), this.$ml.get('word.shortName'), this.$ml.get('word.status')];
    this.columns = ['№', this.$ml.get('word.fullName'), this.$ml.get('word.shortName'), this.$ml.get('word.status')];
    this.columnOptions = ['№', this.$ml.get('word.fullName'), this.$ml.get('word.shortName'), this.$ml.get('word.status')];
    this.tableColumns = [
      {key: 'id', label: '№', sortable: true},
      {key: 'data', label: this.$ml.get('word.fullName'), sortable: true},
      {key: 'secondary_data', label: this.$ml.get('word.shortName'), sortable: true},
      {key: 'status', label: this.$ml.get('word.status'), sortable: true}];
    this.allTableColumns = [
      {key: 'id', label: '№', sortable: true},
      {key: 'data', label: this.$ml.get('word.fullName'), sortable: true},
      {key: 'secondary_data', label: this.$ml.get('word.shortName'), sortable: true},
      {key: 'status', label: this.$ml.get('word.status'), sortable: true}];
  }
}
</script>

<style scoped>
.my-table-scroll::-webkit-scrollbar {
  width: 0px;
}

.posCenter {
  padding-left: 50%;
  padding-right: 50%
}

a {
  padding-left: 3vw;
  padding-right: 3vw;
  color: #272e38;
  font-weight: bold;
}
.pagin-st {
  position: relative;
  top: 15px;
}

.pagin-content {
  padding-bottom: 10px;
  height: 60px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.title-bord {
  text-align: center;
  position: relative;
  right: 1vw;
  border-style: solid;
  border-color: lightgray;
  border-width: 0px 2px 0px 0px;
}

.savePageRow {
  max-width: 75vw;
  min-width: 75vw;
}
</style>