// ... (previous imports)

function Tables() {
  // ... (existing state variables)

  const [selectedGlobalAccount, setSelectedGlobalAccount] = useState([]);
  const [selectedPlatformText, setSelectedPlatformText] = useState([]);
  const [selectedProgramText, setSelectedProgramText] = useState([]);
  const [selectedMountingLocation, setSelectedMountingLocation] = useState([]);
  const [selectedProgramClassification, setSelectedProgramClassification] = useState([]);

  // ... (existing code)

  const filterGlobalAccountCallback = (selGlobalAccount) => {
    setSelectedGlobalAccount(selGlobalAccount.val);
    setSelectedFilter((prevFilters) => ({
      ...prevFilters,
      globalAccount: selGlobalAccount.val,
    }));
  };

  const filterPlatformTextCallback = (selPlatformText) => {
    setSelectedPlatformText(selPlatformText.val);
    setSelectedFilter((prevFilters) => ({
      ...prevFilters,
      platformText: selPlatformText.val,
    }));
  };

  const filterProgramTextCallback = (selProgramText) => {
    setSelectedProgramText(selProgramText.val);
    setSelectedFilter((prevFilters) => ({
      ...prevFilters,
      programText: selProgramText.val,
    }));
  };

  const filterMountingLocationCallback = (selMountingLocation) => {
    setSelectedMountingLocation(selMountingLocation.val);
    setSelectedFilter((prevFilters) => ({
      ...prevFilters,
      mountingLocation: selMountingLocation.val,
    }));
  };

  const filterProgramClassificationCallback = (selProgramClassification) => {
    setSelectedProgramClassification(selProgramClassification.val);
    setSelectedFilter((prevFilters) => ({
      ...prevFilters,
      programClassification: selProgramClassification.val,
    }));
  };

  // ... (existing code)

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/salApi/Salesforce/")
      .then((response) => {
        setBasedata(response.data);
        setTbdata(response.data);
        setLoading(false);
        setIsDone(true);

        let uniqueGlobalAccounts = new Set(response.data.map((val) => val.GlobalAccount));
        let uniquePlatformTexts = new Set(response.data.map((val) => val.PlatformText));
        let uniqueProgramTexts = new Set(response.data.map((val) => val.ProgramText));
        let uniqueMountingLocations = new Set(response.data.map((val) => val.MountingLocation));
        let uniqueProgramClassifications = new Set(response.data.map((val) => val.ProgramClassification));

        setUnqGlobalAccount(Array.from(uniqueGlobalAccounts));
        setUnqPlatformText(Array.from(uniquePlatformTexts));
        setUnqProgramText(Array.from(uniqueProgramTexts));
        setUnqMountingLocation(Array.from(uniqueMountingLocations));
        setUnqProgramClassification(Array.from(uniqueProgramClassifications));

        console.log(response.data);
      })
      .catch((error) => {
        setErr(error);
        console.log(error);
        setLoading(false);
      });
  }, []);

  // ... (existing code)

  return (
    <React.Fragment>
      <div className="content">
        <BopFilterNew
          plant={unqPlant}
          mainValving={unqMainValving}
          rod={unqRod}
          pt={unqPT}
          technology={unqTechnology}
          globalAccount={unqGlobalAccount}
          platformText={unqPlatformText}
          programText={unqProgramText}
          mountingLocation={unqMountingLocation}
          programClassification={unqProgramClassification}
          filterPlantCallback={filterPlantCallback}
          filterMainValvingCallback={filterMainValvingCallback}
          filterRodCallback={filterRodCallback}
          filterPTCallback={filterPTCallback}
          filterTechnologyCallback={filterTechnologyCallback}
          filterGlobalAccountCallback={filterGlobalAccountCallback}
          filterPlatformTextCallback={filterPlatformTextCallback}
          filterProgramTextCallback={filterProgramTextCallback}
          filterMountingLocationCallback={filterMountingLocationCallback}
          filterProgramClassificationCallback={filterProgramClassificationCallback}
        />

        {/* ... (existing code) */}
      </div>
    </React.Fragment>
  );
}

export default Tables;
